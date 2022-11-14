package com.boxthing.mqtt.handler;

import com.boxthing.api.domain.Device;
import com.boxthing.api.domain.User;
import com.boxthing.api.repository.DeviceRepository;
import com.boxthing.mqtt.MessageCreator;
import com.boxthing.mqtt.dto.MqttReqDto.MqttRequestDto;
import com.boxthing.mqtt.dto.MqttResDto.MqttLoginResDto;
import com.boxthing.util.AccessTokenRefresh;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.messaging.MessageHandler;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class InitHandler {
  private final DeviceRepository deviceRepository;

  private final AccessTokenRefresh accessTokenRefresh;

  private final MessageCreator messageCreator;

  @Bean
  @ServiceActivator(inputChannel = "mqtt-init")
  public MessageHandler bootHandler() {

    return message -> {
      MqttRequestDto requestDto = (MqttRequestDto) message.getPayload();
      String deviceId = requestDto.getDeviceId();
      Device device = deviceRepository.findBySerialNumber(deviceId);
      String topic = "init";
      //      if (device == null || device.getUser() == null) {
      //        log.info("empty");
      //        if (device == null) {
      //          msg = responseMessage.NO_SERIAL_NUMBER.getMessage();
      //        } else {
      //          msg = responseMessage.NO_USER_CONNECT.getMessage();
      //        }
      //        MqttLoginResDto data = MqttLoginResDto.builder()..build();
      //        messageParser.msgFail(msg, deviceId, topic, data);
      //        return;
      //      }
      MqttLoginResDto resDto =
          MqttLoginResDto.builder().githubAccessToken("").googleAccessToken("").build();

      if (device == null) {
        deviceRepository.save(Device.builder().serialNumber(deviceId).build());
        messageCreator.noSerialNumber(deviceId, topic, resDto);
        return;
      } else if (device.getUser() == null) {
        messageCreator.noUserConnect(deviceId, topic, resDto);
        return;
      } else {
        User user = device.getUser();
        if (user.getGoogleRefreshJws() != null) {
          String googleAccessToke;
          try {
            googleAccessToke = accessTokenRefresh.getAccessToken(user.getGoogleRefreshJws());
            if (googleAccessToke != null) {
              resDto.setGoogleAccessToken(googleAccessToke);
            }
          } catch (IOException e) {
            messageCreator.invalidToken(deviceId, topic, null);
            throw new RuntimeException(e);
          }
        }
        if (user.getGithubJws() != null) {
          resDto.setGithubAccessToken(user.getGithubJws());
        }
      }
      if (!resDto.getGithubAccessToken().equals("") && !resDto.getGoogleAccessToken().equals("")) {
        messageCreator.succeed(deviceId, topic, resDto);
        return;

      } else {
        if (resDto.getGoogleAccessToken().equals("") && resDto.getGithubAccessToken().equals("")) {
          messageCreator.invalidToken(deviceId, topic, resDto);
        } else if (!resDto.getGithubAccessToken().equals("")) {
          messageCreator.noGoogleToken(deviceId, topic, resDto);
        } else {
          messageCreator.noGithubToken(deviceId, topic, resDto);
        }
      }
    };
  }
}
