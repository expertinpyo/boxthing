package com.boxthing.mqtt;

import com.boxthing.config.MqttConfig.MqttOutboundGateway;
import com.boxthing.dto.MqttDto.MqttLogDto;
import com.boxthing.dto.MqttDto.MqttRequestDto;
import com.boxthing.dto.MqttDto.MqttResponseDto;
import com.google.gson.Gson;
import java.util.List;
import lombok.RequiredArgsConstructor;
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

  public MessageHandler qrHandler() {
    return new MessageHandler() {
      @Override
      public void handleMessage(Message<?> message) throws MessagingException {
        MqttRequestDto requestDto = (MqttRequestDto) message.getPayload();
        String deviceId = requestDto.getDeviceId();
        // make new qrcode for deviceId
        String qrUrl = "https://path-to-google-login";

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
}
