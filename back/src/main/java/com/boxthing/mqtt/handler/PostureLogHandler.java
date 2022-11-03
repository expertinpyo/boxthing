package com.boxthing.mqtt.handler;

import static com.boxthing.util.GsonUtil.PATTERN_DATETIME;

import com.boxthing.api.domain.Device;
import com.boxthing.api.domain.User;
import com.boxthing.api.dto.WaterLogDto.WaterLogRequestDto;
import com.boxthing.api.mapper.WaterLogMapper;
import com.boxthing.api.querydsl.WaterLogQueryDsl;
import com.boxthing.api.repository.DeviceRepository;
import com.boxthing.api.repository.WaterLogRepository;
import com.boxthing.config.MqttConfig.MqttOutboundGateway;
import com.boxthing.config.MqttProperties;
import com.boxthing.mqtt.dto.MqttDto.MqttRequestDto;
import com.boxthing.util.GsonUtil.LocalDateTimeAdapter;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.internal.LinkedTreeMap;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageHandler;
import org.springframework.messaging.MessagingException;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class PostureLogHandler {
  private final MqttOutboundGateway gateway;

  private final MqttProperties mqttProperties;
  private final Gson gson =
      new GsonBuilder()
          .setDateFormat(PATTERN_DATETIME)
          .registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter().nullSafe())
          .create();
  private final DeviceRepository deviceRepository;

  public MessageHandler postureCreateHandler() {
    return new MessageHandler() {
      @Override
      public void handleMessage(Message<?> message)
          throws MessagingException, NullPointerException {
        }
    };
  }

  public MessageHandler postureHandler() {
    return new MessageHandler() {
      @Override
      public void handleMessage(Message<?> message)
          throws MessagingException, NullPointerException {
      }
    };
  }

}
