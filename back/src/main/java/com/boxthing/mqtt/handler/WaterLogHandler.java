package com.boxthing.mqtt.handler;

import static com.boxthing.util.UtilMethods.jsonConverter;

import com.boxthing.api.domain.Device;
import com.boxthing.api.domain.User;
import com.boxthing.api.domain.WaterLog;
import com.boxthing.api.dto.WaterLogDto.WaterLogRequestDto;
import com.boxthing.api.mapper.WaterLogMapper;
import com.boxthing.api.querydsl.WaterLogQueryDsl;
import com.boxthing.api.repository.DeviceRepository;
import com.boxthing.api.repository.WaterLogRepository;
import com.boxthing.mqtt.MessageCreator;
import com.boxthing.mqtt.dto.MqttReqDto.MqttRequestDto;
import com.boxthing.mqtt.dto.MqttReqDto.MqttWaterDaysReqData;
import com.boxthing.mqtt.dto.MqttReqDto.MqttWaterReqData;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.messaging.MessageHandler;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class WaterLogHandler {

  private final WaterLogQueryDsl waterLogQueryDsl;

  private final DeviceRepository deviceRepository;
  private final WaterLogRepository waterLogRepository;
  private final WaterLogMapper waterLogMapper;

  private final MessageCreator messageCreator;

  @Bean
  @ServiceActivator(inputChannel = "mqtt-water")
  public MessageHandler waterHandler() {
    return message -> {
      Type typeToken = new TypeToken<MqttRequestDto<MqttWaterReqData>>() {}.getType();
      MqttRequestDto<MqttWaterReqData> requestDto = jsonConverter(message.getPayload(), typeToken);
      ZonedDateTime time = ZonedDateTime.parse(requestDto.getData().getTimestamp());
      log.info("time : {}", time);
      String deviceId = requestDto.getDeviceId();
      MqttWaterReqData data = requestDto.getData();

      String topic = "water";

      if (data == null) {
        messageCreator.noInputData(deviceId, topic, null);
        return;
      }

      if (data.getAmount() == null) {
        messageCreator.invalidInputData(deviceId, topic, null);
        return;
      }
      log.info("data type : {}", data.getAmount().getClass().getName());
      float amount = data.getAmount().floatValue();

      Device device = deviceRepository.findBySerialNumber(deviceId);
      User user = device.getUser();
      if (user == null) {
        messageCreator.noUserConnect(deviceId, topic, null);
        return;
      }

      WaterLogRequestDto waterDto =
          WaterLogRequestDto.builder().amount(amount).timestamp(time).user(user).build();
      waterLogRepository.save(waterLogMapper.toEntity(waterDto));
      messageCreator.created(deviceId, topic, null);
    };
  }

  @Bean
  @ServiceActivator(inputChannel = "mqtt-log/water/stat")
  public MessageHandler waterLogStatHandler() {
    return message -> {
      Type typeToken = new TypeToken<MqttRequestDto<MqttWaterDaysReqData>>() {}.getType();
      MqttRequestDto<MqttWaterDaysReqData> requestDto =
          jsonConverter(message.getPayload(), typeToken);

      String deviceId = requestDto.getDeviceId();
      MqttWaterDaysReqData data = requestDto.getData();

      String topic = "log/water/stat";

      Device device = deviceRepository.findBySerialNumber(deviceId);

      if (device == null) {
        messageCreator.noSerialNumber(deviceId, topic, new ArrayList<>());
        return;
      }
      User user = device.getUser();

      if (user == null) {
        messageCreator.noUserConnect(deviceId, topic, new ArrayList<>());
        return;
      }

      Integer days = 15;
      if (data != null && data.getDays() != null) {
        days = data.getDays();
      }

      log.info("before : {}", days);
      List<WaterLog> list = waterLogQueryDsl.findAllByUserAndDate(user, days);
      if (list.isEmpty()) {
        messageCreator.emptyResult(deviceId, topic, new ArrayList<>());
        return;
      }
      messageCreator.succeed(deviceId, topic, waterLogMapper.toDateList(list, days));
    };
  }

  @Bean
  @ServiceActivator(inputChannel = "mqtt-log/water/today")
  public MessageHandler waterTodayHandler() {
    return message -> {
      MqttRequestDto requestDto = (MqttRequestDto) message.getPayload();
      String deviceId = requestDto.getDeviceId();

      String topic = "log/water/today";
      Device device = deviceRepository.findBySerialNumber(deviceId);

      if (device == null) {
        messageCreator.noSerialNumber(deviceId, topic, new ArrayList<>());
        return;
      }
      User user = device.getUser();

      if (user == null) {
        messageCreator.noUserConnect(deviceId, topic, new ArrayList<>());
        return;
      }

      List<WaterLog> list = waterLogQueryDsl.findallByUserAndToday(user);
      if (list.isEmpty()) {
        List emptyList = new ArrayList<>();
        messageCreator.succeed(deviceId, topic, emptyList);
      } else {
        messageCreator.succeed(deviceId, topic, waterLogMapper.toList(list));
      }
    };
  }
}
