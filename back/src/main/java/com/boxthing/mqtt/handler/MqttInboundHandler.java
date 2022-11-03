package com.boxthing.mqtt.handler;

import com.boxthing.api.domain.Device;
import com.boxthing.api.domain.User;
import com.boxthing.api.dto.DeviceDto.DeviceRequestDto;
import com.boxthing.api.dto.UserDto.UserNullDto;
import com.boxthing.api.mapper.DeviceMapper;
import com.boxthing.api.mapper.UserMapper;
import com.boxthing.api.repository.DeviceRepository;
import com.boxthing.api.repository.UserRepository;
import com.boxthing.config.MqttConfig.MqttOutboundGateway;
import com.boxthing.config.MqttProperties;
import com.boxthing.mqtt.dto.MqttDto.MqttLogDto;
import com.boxthing.mqtt.dto.MqttDto.MqttRequestDto;
import com.boxthing.mqtt.dto.MqttDto.MqttResponseDto;
import com.boxthing.security.oauth2.QRCreator;
import com.google.gson.Gson;
import com.google.gson.internal.LinkedTreeMap;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageHandler;
import org.springframework.messaging.MessagingException;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class MqttInboundHandler {

  private final MqttOutboundGateway gateway;
  private final MqttProperties mqttProperties;
  private final Gson gson = new Gson();
  private final QRCreator qrCreator;

  private final DeviceRepository deviceRepository;
  private final DeviceMapper deviceMapper;

  private final UserRepository userRepository;
  private final UserMapper userMapper;

  public MessageHandler qrHandler() {
    return new MessageHandler() {
      @SneakyThrows
      @Override
      public void handleMessage(Message<?> message)
          throws MessagingException, NullPointerException {
        MqttRequestDto requestDto = (MqttRequestDto) message.getPayload();
        String deviceId = requestDto.getDeviceId();
        log.info("Data : {}", requestDto.getData());
        LinkedTreeMap<String, String> data =
            (LinkedTreeMap<java.lang.String, java.lang.String>) requestDto.getData();
        String site = data.get("provider");

        String qrUrl = qrCreator.hashedUri(deviceId, site);
        if (qrUrl == null) {
          return;
        }
        LinkedTreeMap<String, String> responseData = new LinkedTreeMap<>();
        responseData.put("provider", qrUrl);

        MqttResponseDto responseDto =
            MqttResponseDto.builder().type("qr").data(responseData).build();
        gateway.publish(
            String.format("%s/%s", mqttProperties.getBASE_TOPIC(), deviceId),
            gson.toJson(responseDto));
      }
    };
  }

  public MessageHandler accessTokenHandler() {
    return new MessageHandler() {
      @SneakyThrows
      @Override
      public void handleMessage(Message<?> message)
          throws MessagingException, NullPointerException {
        MqttRequestDto requestDto = (MqttRequestDto) message.getPayload();
        String deviceId = requestDto.getDeviceId();
        LinkedTreeMap<String, String> data =
            (LinkedTreeMap<java.lang.String, java.lang.String>) requestDto.getData();
        String site = data.get("provider");

        Device device = deviceRepository.findBySerialNumber(deviceId);
        if (device == null || device.getUser() == null) {
          return;
        }
        LinkedTreeMap<String, String> responseData = new LinkedTreeMap<>();
        responseData.put("provider", site);
        if (site.equals("google")) {
          responseData.put("access_token", device.getUser().getGoogleRefreshJws());
        } else if (site.equals("github")) {
          responseData.put("access_token", device.getUser().getGithubJws());
        } else {
          return;
        }

        MqttResponseDto responseDto =
            MqttResponseDto.builder().type("access_token").data(responseData).build();
        gateway.publish(
            String.format("%s/%s", mqttProperties.getBASE_TOPIC(), deviceId),
            gson.toJson(responseDto));
      }
    };
  }

  public MessageHandler logoutHandler() {
    return new MessageHandler() {
      @Override
      public void handleMessage(Message<?> message) throws MessagingException {
        MqttRequestDto requestDto = (MqttRequestDto) message.getPayload();
        String deviceId = requestDto.getDeviceId();
        @SuppressWarnings("unchecked")
        List<MqttLogDto> data = (List<MqttLogDto>) requestDto.getData();
        Device device = deviceRepository.findBySerialNumber(deviceId);
        User user = device.getUser();

        if (user == null) {
          return;
        }

        DeviceRequestDto deviceDto =
            DeviceRequestDto.builder()
                .state(device.getState())
                .user(null)
                .id(device.getId())
                .serialNumber(device.getSerialNumber())
                .build();

        UserNullDto userDto =
            UserNullDto.builder()
                .googleRefreshJws(null)
                .githubJws(null)
                .email(user.getEmail())
                .id(user.getId())
                .createdAt(user.getCreatedAt())
                .updatedAt(LocalDateTime.now())
                .device(null)
                .build();

        userMapper.updateWithNull(userDto, user);
        userRepository.save(user);

        deviceMapper.updateWithNull(deviceDto, device);
        deviceRepository.save(device);
        // store some logs for deviceId
        log.info("Logout completed\n");
      }
    };
  }
}
