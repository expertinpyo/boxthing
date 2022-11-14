package com.boxthing.mqtt;

import static com.boxthing.util.GsonUtil.PATTERN_DATETIME;

import com.boxthing.config.MqttConfig.MqttOutboundGateway;
import com.boxthing.config.MqttProperties;
import com.boxthing.mqtt.dto.MqttResDto.MqttResponseDto;
import com.boxthing.util.GsonUtil.LocalDateTimeAdapter;
import com.google.gson.FieldNamingPolicy;
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
  private final Gson gson =
      new GsonBuilder()
          .setDateFormat(PATTERN_DATETIME)
          .setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES)
          .registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter().nullSafe())
          .create();
  private final MqttProperties mqttProperties;

  public void msgSucceed(String msg, String serialNumber, String topic, Object data) {
    MqttResponseDto responseDto =
        MqttResponseDto.builder().topic(topic).message(msg).success(true).data(data).build();
    log.info("responseDto : {}", responseDto);
    gateway.publish(
        String.format("%s/%s/%s", mqttProperties.getBaseTopic() + "/device", serialNumber, topic),
        gson.toJson(responseDto));
  }

  public void msgFail(String msg, String serialNumber, String topic, Object data) {
    MqttResponseDto responseDto =
        MqttResponseDto.builder().topic(topic).message(msg).success(false).data(data).build();
    log.info("responseDto : {}", responseDto);
    gateway.publish(
        String.format("%s/%s/%s", mqttProperties.getBaseTopic() + "/device", serialNumber, topic),
        gson.toJson(responseDto));
  }
}
