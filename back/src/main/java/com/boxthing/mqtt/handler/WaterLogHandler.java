package com.boxthing.mqtt.handler;

import static com.boxthing.mqtt.handler.MqttInboundHandler.responseMessage;
import static com.boxthing.util.UtilMethods.jsonConverter;

import com.boxthing.api.domain.Device;
import com.boxthing.api.domain.User;
import com.boxthing.api.domain.WaterLog;
import com.boxthing.api.dto.WaterLogDto.WaterLogRequestDto;
import com.boxthing.api.mapper.WaterLogMapper;
import com.boxthing.api.querydsl.WaterLogQueryDsl;
import com.boxthing.api.repository.DeviceRepository;
import com.boxthing.api.repository.WaterLogRepository;
import com.boxthing.mqtt.MessageParser;
import com.boxthing.mqtt.dto.MqttReqDto.MqttRequestDto;
import com.boxthing.mqtt.dto.MqttReqDto.MqttWaterDaysReqData;
import com.boxthing.mqtt.dto.MqttReqDto.MqttWaterReqData;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
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

  private final MessageParser messageParser;

  @Bean
  @ServiceActivator(inputChannel = "mqtt-water")
  public MessageHandler waterHandler() {
    return message -> {
      Type typeToken = new TypeToken<MqttRequestDto<MqttWaterReqData>>() {}.getType();
      MqttRequestDto<MqttWaterReqData> requestDto = jsonConverter(message.getPayload(), typeToken);

      String deviceId = requestDto.getDeviceId();
      MqttWaterReqData data = requestDto.getData();

      Float amount = data.getAmount().floatValue();

      Device device = deviceRepository.findBySerialNumber(deviceId);
      User user = device.getUser();

      WaterLogRequestDto waterDto = WaterLogRequestDto.builder().amount(amount).user(user).build();
      waterLogRepository.save(waterLogMapper.toEntity(waterDto));

      String msg = responseMessage.CREATED.getMessage();
      String topic = "water";

      messageParser.msgSucceed(msg, deviceId, topic);
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

      Device device = deviceRepository.findBySerialNumber(deviceId);
      User user = device.getUser();

      String msg;
      String topic = "log/water/stat";

      if (user == null) {
        msg = responseMessage.NO_USER_CONNECT.getMessage();
        messageParser.msgFail(msg, deviceId, topic);
        return;
      }
      Integer days = data.getDays();

      log.info("before : {}", days);
      List<WaterLog> list = waterLogQueryDsl.findAllByUserAndDate(user, days);
      if (list.isEmpty()) {
        msg = responseMessage.EMPTY_RESULT.getMessage();
        messageParser.msgFail(msg, deviceId, topic);
        return;
      }
      msg = responseMessage.SUCCEED.getMessage();
      messageParser.msgSucceed(msg, deviceId, topic, waterLogMapper.toDateList(list, days));
    };
  }

  @Bean
  @ServiceActivator(inputChannel = "mqtt-log/water/today")
  public MessageHandler waterTodayHandler() {
    return message -> {
      MqttRequestDto requestDto = (MqttRequestDto) message.getPayload();
      String deviceId = requestDto.getDeviceId();

      Device device = deviceRepository.findBySerialNumber(deviceId);
      User user = device.getUser();

      String msg;
      String topic = "log/water/today";

      if (user == null) {
        msg = responseMessage.NO_USER_CONNECT.getMessage();
        messageParser.msgFail(msg, deviceId, topic);
        return;
      }

      List<WaterLog> list = waterLogQueryDsl.findallByUserAndToday(user);
      msg = responseMessage.SUCCEED.getMessage();
      messageParser.msgSucceed(msg, deviceId, topic, waterLogMapper.toList(list));
    };
  }
}
