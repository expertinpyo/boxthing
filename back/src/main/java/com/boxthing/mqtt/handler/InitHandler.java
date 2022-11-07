package com.boxthing.mqtt.handler;

import com.boxthing.api.domain.Device;
import com.boxthing.api.repository.DeviceRepository;
import com.boxthing.enums.ResponseMessage;
import com.boxthing.mqtt.MessageParser;
import com.boxthing.mqtt.dto.MqttReqDto.MqttRequestDto;
import com.boxthing.mqtt.dto.MqttResDto.MqttLoginResDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageHandler;
import org.springframework.messaging.MessagingException;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class InitHandler {
  private final DeviceRepository deviceRepository;

  private ResponseMessage responseMessage;
  private final MessageParser messageParser;

  public MessageHandler bootHandler() {

    return new MessageHandler() {
      @Override
      public void handleMessage(Message<?> message) throws MessagingException {
        MqttRequestDto requestDto = (MqttRequestDto) message.getPayload();
        String deviceId = requestDto.getDeviceId();
        Device device = deviceRepository.findBySerialNumber(deviceId);
        String msg;
        String type = "init";
        if (device == null || device.getUser() == null) {
          log.info("empty");
          if (device == null) {
            msg = responseMessage.NO_SERIAL_NUMBER.getMessage();
          } else {
            msg = responseMessage.NO_USER_CONNECT.getMessage();
          }
          MqttLoginResDto data = MqttLoginResDto.builder().isLogin(false).build();
          messageParser.msgFail(msg, deviceId, type, data);
          return;
        }
        MqttLoginResDto data = MqttLoginResDto.builder().isLogin(true).build();
        msg = responseMessage.SUCCEED.getMessage();
        messageParser.msgSucceed(msg, deviceId, type, data);
      }
    };
  }
}
