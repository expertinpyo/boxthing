package com.boxthing.mqtt.handler;

import static com.boxthing.util.UtilMethods.jsonConverter;

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
import com.boxthing.mqtt.dto.MqttReqDto.MqttProviderReqData;
import com.boxthing.mqtt.dto.MqttReqDto.MqttRequestDto;
import com.boxthing.mqtt.dto.MqttResDto.MqttAccessTokenResDto;
import com.boxthing.mqtt.dto.MqttResDto.MqttProviderResDto;
import com.boxthing.mqtt.dto.MqttResDto.MqttResponseDto;
import com.boxthing.util.AccessTokenRefresh;
import com.boxthing.util.QRCreator;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.integration.annotation.ServiceActivator;
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

  private final AccessTokenRefresh accessTokenRefresh;

  public MessageHandler qrHandler() {
    return new MessageHandler() {
      @SneakyThrows
      @Override
      public void handleMessage(Message<?> message)
          throws MessagingException, NullPointerException {
        log.info("message : {}", message);
        log.info("payload : {}", message.getPayload());
        Type type = new TypeToken<MqttRequestDto<MqttProviderReqData>>() {}.getType();
        MqttRequestDto<MqttProviderReqData> requestDto = jsonConverter(message.getPayload(), type);
        log.info("{}", requestDto);
        String deviceId = requestDto.getDeviceId();
        MqttProviderReqData data = requestDto.getData();

        //
        String qrUrl = qrCreator.hashedUri(deviceId, data.getProvider());
        log.info("{} {} {}", deviceId, data, qrUrl);
        if (qrUrl == null) {
          return;
        }
        MqttProviderResDto responseResDto =
            MqttProviderResDto.builder().provider(data.getProvider()).link(qrUrl).build();

        MqttResponseDto responseDto =
            MqttResponseDto.builder().type("qr").data(responseResDto).build();
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
        Type type = new TypeToken<MqttRequestDto<MqttProviderReqData>>() {}.getType();
        MqttRequestDto<MqttProviderReqData> requestDto = jsonConverter(message.getPayload(), type);
        String deviceId = requestDto.getDeviceId();
        MqttProviderReqData data = requestDto.getData();

        Device device = deviceRepository.findBySerialNumber(deviceId);
        if (device == null || device.getUser() == null) {
          return;
        }
        MqttAccessTokenResDto tokenDto =
            MqttAccessTokenResDto.builder().provider(data.getProvider()).build();
        if (data.getProvider().equals("google")) {
          String accessToken =
              accessTokenRefresh.getAccessToken(device.getUser().getGoogleRefreshJws());
          tokenDto.setAccessToken(accessToken);
        } else if (data.getProvider().equals("github")) {
          tokenDto.setAccessToken(device.getUser().getGithubJws());
        }

        MqttResponseDto responseDto =
            MqttResponseDto.builder().type("access_token").data(tokenDto).build();
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
        MqttRequestDto<Object> requestDto = (MqttRequestDto<Object>) message.getPayload();
        String deviceId = requestDto.getDeviceId();
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

  @Bean
  @ServiceActivator(inputChannel = "mqtt-qr")
  public MessageHandler qrHandlerNew() {
    return message -> {
      System.out.println("message payload: " + message.getPayload());
    };
  }
}
