package com.boxthing.mqtt;

import static com.boxthing.util.GsonUtil.PATTERN_DATETIME;

import com.boxthing.config.MqttConfig.MqttOutboundGateway;
import com.boxthing.config.MqttProperties;
import com.boxthing.mqtt.dto.MqttResDto.MqttResponseDto;
import com.boxthing.util.GsonUtil.LocalDateTimeAdapter;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class MessageParser {
  private final MqttOutboundGateway gateway;

  private final Gson gson = new Gson();

  private final Gson gsonForLog =
      new GsonBuilder()
          .setDateFormat(PATTERN_DATETIME)
          .registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter().nullSafe())
          .create();
  private final MqttProperties mqttProperties;

  public void msgSucceed(String msg, String serialNumber, String type) {
    MqttResponseDto responseDto = MqttResponseDto.builder().type(type).message(msg).build();
    log.info("responseDto : {}", responseDto);
    gateway.publish(
        String.format("%s/%s", mqttProperties.getBaseTopic(), serialNumber),
        gson.toJson(responseDto));
  }

  public void msgSucceed(String msg, String serialNumber, String type, Object data) {
    MqttResponseDto responseDto =
        MqttResponseDto.builder().type(type).message(msg).data(data).build();
    log.info("responseDto : {}", responseDto);
    gateway.publish(
        String.format("%s/%s", mqttProperties.getBaseTopic(), serialNumber),
        gson.toJson(responseDto));
  }

  public void msgSucceed(String msg, String serialNumber, String type, Object data, Boolean isLog) {
    MqttResponseDto responseDto =
        MqttResponseDto.builder().type(type).message(msg).data(data).build();
    log.info("responseDto : {}", responseDto);
    gateway.publish(
        String.format("%s/%s", mqttProperties.getBaseTopic(), serialNumber),
        gsonForLog.toJson(responseDto));
  }

  public void msgFail(String msg, String serialNumber, String type) {
    MqttResponseDto responseDto = MqttResponseDto.builder().type(type).message(msg).build();
    log.info("responseDto : {}", responseDto);
    gateway.publish(
        String.format("%s/%s", mqttProperties.getBaseTopic(), serialNumber),
        gson.toJson(responseDto));
  }

  public void msgFail(String msg, String serialNumber, String type, Object data) {
    MqttResponseDto responseDto =
        MqttResponseDto.builder().type(type).message(msg).data(data).build();
    log.info("responseDto : {}", responseDto);
    gateway.publish(
        String.format("%s/%s", mqttProperties.getBaseTopic(), serialNumber),
        gson.toJson(responseDto));
  }
}
