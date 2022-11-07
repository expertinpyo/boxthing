package com.boxthing.mqtt.handler;

import com.boxthing.api.domain.Device;
import com.boxthing.api.domain.User;
import com.boxthing.api.dto.DeviceDto.DeviceRequestDto;
import com.boxthing.api.dto.UserDto.UserNullDto;
import com.boxthing.api.mapper.DeviceMapper;
import com.boxthing.api.mapper.UserMapper;
import com.boxthing.api.repository.DeviceRepository;
import com.boxthing.api.repository.UserRepository;
import com.boxthing.enums.ResponseMessage;
import com.boxthing.mqtt.MessageParser;
import com.boxthing.mqtt.dto.MqttReqDto.MqttProviderReqData;
import com.boxthing.mqtt.dto.MqttReqDto.MqttRequestDto;
import com.boxthing.mqtt.dto.MqttResDto.MqttAccessTokenResDto;
import com.boxthing.mqtt.dto.MqttResDto.MqttProviderResDto;
import com.boxthing.util.AccessTokenRefresh;
import com.boxthing.util.QRCreator;
import java.io.IOException;
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

  private final QRCreator qrCreator;

  private final DeviceRepository deviceRepository;
  private final DeviceMapper deviceMapper;

  private final UserRepository userRepository;
  private final UserMapper userMapper;

  private final AccessTokenRefresh accessTokenRefresh;
  private final MessageParser messageParser;
  private ResponseMessage responseMessage;

  @Bean
  @ServiceActivator(inputChannel = "mqtt-qr/google")
  public MessageHandler qrGoogleHandler() {
    return message -> {
      log.info("message : {}", message);
      log.info("payload : {}", message.getPayload());
      MqttRequestDto<Object> requestDto = (MqttRequestDto<Object>) message.getPayload();
      log.info("{}", requestDto);
      String deviceId = requestDto.getDeviceId();
      qrReturner("google", deviceId);
    };
  }

  @Bean
  @ServiceActivator(inputChannel = "mqtt-qr/github")
  public MessageHandler qrGithubHandler() {
    return message -> {
      log.info("message : {}", message);
      log.info("payload : {}", message.getPayload());
      MqttRequestDto<Object> requestDto = (MqttRequestDto<Object>) message.getPayload();
      log.info("{}", requestDto);
      String deviceId = requestDto.getDeviceId();
      qrReturner("github", deviceId);
    };
  }

  @Bean
  @ServiceActivator(inputChannel = "mqtt-access_token/google")
  public MessageHandler accessTokenGoogleHandler() {
    return message -> {
      MqttRequestDto<MqttProviderReqData> requestDto =
          (MqttRequestDto<MqttProviderReqData>) message.getPayload();
      String deviceId = requestDto.getDeviceId();

      String msg;
      String type = "access_token/google";

      Device device = deviceRepository.findBySerialNumber(deviceId);
      //      if (device == null || device.getUser() == null) {
      //        if (device == null) {
      //          msg = responseMessage.NO_SERIAL_NUMBER.getMessage();
      //        } else {
      //          msg = responseMessage.NO_USER_CONNECT.getMessage();
      //        }
      //        messageParser.msgFail(msg, deviceId, type);
      //        return;
      //      }

      String accessToken = null;
      try {
        accessToken = accessTokenRefresh.getAccessToken(device.getUser().getGoogleRefreshJws());
        if (accessToken == null) {
          msg = responseMessage.NO_VALID_TOKEN.getMessage();
          messageParser.msgFail(msg, deviceId, type);
          return;
        }
        MqttAccessTokenResDto tokenDto =
            MqttAccessTokenResDto.builder().accessToken(accessToken).build();
        log.info("token dto : {}", tokenDto);
        msg = responseMessage.SUCCEED.getMessage();
        messageParser.msgSucceed(msg, deviceId, type, tokenDto);
      } catch (IOException e) {
        msg = responseMessage.NO_VALID_TOKEN.getMessage();
        messageParser.msgFail(msg, deviceId, type);
        throw new RuntimeException(e);
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
        String msg;
        String type = "logout";

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
        msg = responseMessage.SUCCEED.getMessage();
        messageParser.msgSucceed(msg, deviceId, type);
      }
    };
  }

  @SneakyThrows
  private void qrReturner(String provider, String deviceId) {
    String msg;
    String type = "qr/" + provider;
    //
    String qrUrl = qrCreator.hashedUri(deviceId, provider);
    if (qrUrl == null) {
      msg = responseMessage.NO_SERIAL_NUMBER.getMessage();
      messageParser.msgFail(msg, deviceId, type);
      return;
    }
    MqttProviderResDto responseResDto = MqttProviderResDto.builder().link(qrUrl).build();
    msg = responseMessage.SUCCEED.getMessage();
    messageParser.msgSucceed(msg, deviceId, type, responseResDto);
  }
  //  @Bean
  //  @ServiceActivator(inputChannel = "mqtt-qr")
  //  public MessageHandler qrHandlerNew() {
  //    return message -> {
  //      System.out.println("message payload: " + message.getPayload());
  //    };
  //  }
}
