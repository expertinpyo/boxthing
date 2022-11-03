package com.boxthing.mqtt.handler;

import static com.boxthing.util.GsonUtil.PATTERN_DATETIME;

import com.boxthing.api.domain.Device;
import com.boxthing.api.domain.User;
import com.boxthing.api.domain.WaterLog;
import com.boxthing.api.dto.WaterLogDto.WaterLogRequestDto;
import com.boxthing.api.mapper.WaterLogMapper;
import com.boxthing.api.querydsl.WaterLogQueryDsl;
import com.boxthing.api.repository.DeviceRepository;
import com.boxthing.api.repository.WaterLogRepository;
import com.boxthing.config.MqttConfig.MqttOutboundGateway;
import com.boxthing.config.MqttProperties;
import com.boxthing.mqtt.dto.MqttDto.MqttRequestDto;
import com.boxthing.mqtt.dto.MqttDto.MqttResponseDto;
import com.boxthing.util.GsonUtil.LocalDateTimeAdapter;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.internal.LinkedTreeMap;
import java.time.LocalDateTime;
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
public class WaterLogHandler {

  private final WaterLogQueryDsl waterLogQueryDsl;
  private final MqttOutboundGateway gateway;

  private final MqttProperties mqttProperties;
  private final Gson gson =
      new GsonBuilder()
          .setDateFormat(PATTERN_DATETIME)
          .registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter().nullSafe())
          .create();
  private final DeviceRepository deviceRepository;
  private final WaterLogRepository waterLogRepository;
  private final WaterLogMapper waterLogMapper;

  public MessageHandler waterCreatHandler() {
    return new MessageHandler() {
      @Override
      public void handleMessage(Message<?> message)
          throws MessagingException, NullPointerException {
        MqttRequestDto requestDto = (MqttRequestDto) message.getPayload();
        String deviceId = requestDto.getDeviceId();
        LinkedTreeMap data = (LinkedTreeMap) requestDto.getData();
        Double rawAmount = (Double) data.get("amount");
        Float amount = rawAmount.floatValue();

        log.info("device : {}", deviceRepository.findBySerialNumber(deviceId));
        Device device = deviceRepository.findBySerialNumber(deviceId);
        User user = device.getUser();
        log.info("user : {}", user);
        WaterLogRequestDto waterDto =
            WaterLogRequestDto.builder().amount(amount).user(user).build();
        log.info("waterDto, {}", waterDto.toString());
        waterLogRepository.save(waterLogMapper.toEntity(waterDto));
      }
    };
  }

  public MessageHandler waterHandler() {
    return new MessageHandler() {
      @Override
      public void handleMessage(Message<?> message)
          throws MessagingException, NullPointerException {
        MqttRequestDto requestDto = (MqttRequestDto) message.getPayload();
        String deviceId = requestDto.getDeviceId();

        Device device = deviceRepository.findBySerialNumber(deviceId);
        User user = device.getUser();

        if (user == null) {
          log.info("This device doesn't have any user");
          return;
        }

        LinkedTreeMap data = (LinkedTreeMap) requestDto.getData();
        log.info("data : {}", data);
        Double beforeDouble = (Double) data.get("before");
        Integer before = beforeDouble.intValue();
        log.info("before : {}", before);
        List<WaterLog> list = waterLogQueryDsl.findAllByUserAndDate(user, before);
        log.info("result list : {}", list);

        MqttResponseDto responseDto =
            MqttResponseDto.builder()
                .type("waterGet")
                .data(waterLogMapper.toDateList(list))
                .build();
        log.info("response : {}", responseDto);
        log.info("gson: {}", gson.toJson(responseDto));
        gateway.publish(
            String.format("%s/%s", mqttProperties.getBASE_TOPIC(), deviceId),
            gson.toJson(responseDto));
      }
    };
  }

  public MessageHandler waterTodayHandler() {
    return new MessageHandler() {
      @Override
      public void handleMessage(Message<?> message)
          throws MessagingException, NullPointerException {
        MqttRequestDto requestDto = (MqttRequestDto) message.getPayload();
        String deviceId = requestDto.getDeviceId();

        Device device = deviceRepository.findBySerialNumber(deviceId);
        User user = device.getUser();

        if (user == null) {
          log.info("This device doesn't have any user");
          return;
        }

        LinkedTreeMap data = (LinkedTreeMap) requestDto.getData();
        List<WaterLog> list = waterLogQueryDsl.findallByUserAndToday(user);

        MqttResponseDto responseDto =
            MqttResponseDto.builder().type("waterGet").data(waterLogMapper.toList(list)).build();
        log.info("response : {}", responseDto);
        log.info("gson: {}", gson.toJson(responseDto));
        gateway.publish(
            String.format("%s/%s", mqttProperties.getBASE_TOPIC(), deviceId),
            gson.toJson(responseDto));
      }
    };
  }
}
