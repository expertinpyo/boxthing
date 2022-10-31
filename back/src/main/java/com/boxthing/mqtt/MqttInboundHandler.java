package com.boxthing.mqtt;

import com.boxthing.api.v1.domain.Device;
import com.boxthing.api.v1.domain.User;
import com.boxthing.api.v1.domain.mapper.DeviceMapper;
import com.boxthing.api.v1.domain.mapper.UserMapper;
import com.boxthing.api.v1.dto.DeviceDto.DeviceRequestDto;
import com.boxthing.api.v1.dto.UserDto.UserNullDto;
import com.boxthing.api.v1.repository.DeviceRepository;
import com.boxthing.api.v1.repository.UserRepository;
import com.boxthing.config.MqttConfig.MqttOutboundGateway;
import com.boxthing.dto.MqttDto.MqttLogDto;
import com.boxthing.dto.MqttDto.MqttRequestDto;
import com.boxthing.dto.MqttDto.MqttResponseDto;
import com.boxthing.security.oauth2.QRCreator;
import com.google.gson.Gson;
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
  private static final String BASE_TOPIC = "boxthing";
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
        String site = (String) requestDto.getData();
        // make new qrcode for deviceId

        String qrUrl = qrCreator.hashedUri(deviceId, site);
        if (qrUrl == null) {
          return;
        }

        MqttResponseDto responseDto = MqttResponseDto.builder().type("qr").data(qrUrl).build();
        gateway.publish(String.format("%s/%s", BASE_TOPIC, deviceId), gson.toJson(responseDto));
      }
    };
  }

  public MessageHandler logHandler() {
    return new MessageHandler() {
      @Override
      public void handleMessage(Message<?> message) throws MessagingException {
        MqttRequestDto requestDto = (MqttRequestDto) message.getPayload();
        String deviceId = requestDto.getDeviceId();
        @SuppressWarnings("unchecked")
        List<MqttLogDto> data = (List<MqttLogDto>) requestDto.getData();

        // store some logs for deviceId
        log.info("Storing log='{}' from device='{}'\n", data.toString(), deviceId);
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

  public MessageHandler registerHandler() {
    return new MessageHandler() {
      @Override
      public void handleMessage(Message<?> message) throws MessagingException {
        MqttRequestDto requestDto = (MqttRequestDto) message.getPayload();
        String deviceId = requestDto.getDeviceId();
        if (deviceRepository.findBySerialNumber(deviceId) != null) {
          log.info("Already existed Serial Number");
          return;
        }
        DeviceRequestDto deviceRequestDto =
            DeviceRequestDto.builder().serialNumber(deviceId).build();
        deviceRepository.save(deviceMapper.toEntity(deviceRequestDto));
        log.info("Device has been registered");
      }
    };
  }
}
