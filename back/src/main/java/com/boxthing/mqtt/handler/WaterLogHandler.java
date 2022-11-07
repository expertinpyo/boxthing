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
import com.boxthing.enums.ResponseMessage;
import com.boxthing.mqtt.MessageParser;
import com.boxthing.mqtt.dto.MqttReqDto.MqttRequestDto;
import com.boxthing.mqtt.dto.MqttReqDto.MqttWaterBeforeReqData;
import com.boxthing.mqtt.dto.MqttReqDto.MqttWaterReqData;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
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

  private final DeviceRepository deviceRepository;
  private final WaterLogRepository waterLogRepository;
  private final WaterLogMapper waterLogMapper;

  private final MessageParser messageParser;
  private ResponseMessage responseMessage;

  public MessageHandler waterCreatHandler() {
    return new MessageHandler() {
      @Override
      public void handleMessage(Message<?> message)
          throws MessagingException, NullPointerException {
        Type typeToken = new TypeToken<MqttRequestDto<MqttWaterReqData>>() {}.getType();
        MqttRequestDto<MqttWaterReqData> requestDto =
            jsonConverter(message.getPayload(), typeToken);
        String deviceId = requestDto.getDeviceId();
        MqttWaterReqData data = requestDto.getData();

        Float amount = data.getAmount().floatValue();

        Device device = deviceRepository.findBySerialNumber(deviceId);
        User user = device.getUser();

        WaterLogRequestDto waterDto =
            WaterLogRequestDto.builder().amount(amount).user(user).build();
        waterLogRepository.save(waterLogMapper.toEntity(waterDto));

        String msg = responseMessage.CREATED.getMessage();
        String type = "waterlog_create";

        messageParser.msgSucceed(msg, deviceId, type);
      }
    };
  }

  public MessageHandler waterHandler() {
    return new MessageHandler() {
      @Override
      public void handleMessage(Message<?> message)
          throws MessagingException, NullPointerException {
        Type typeToken = new TypeToken<MqttRequestDto<MqttWaterBeforeReqData>>() {}.getType();
        MqttRequestDto<MqttWaterBeforeReqData> requestDto =
            jsonConverter(message.getPayload(), typeToken);

        String deviceId = requestDto.getDeviceId();
        MqttWaterBeforeReqData data = requestDto.getData();

        Device device = deviceRepository.findBySerialNumber(deviceId);
        User user = device.getUser();

        String msg;
        String type = "waterlog";

        if (user == null) {
          msg = responseMessage.NO_USER_CONNECT.getMessage();
          messageParser.msgFail(msg, deviceId, type);
          return;
        }
        Integer before = data.getBefore();

        log.info("before : {}", before);
        List<WaterLog> list = waterLogQueryDsl.findAllByUserAndDate(user, before);
        if (list.isEmpty()) {
          msg = responseMessage.EMPTY_RESULT.getMessage();
          messageParser.msgFail(msg, deviceId, type);
          return;
        }
        msg = responseMessage.SUCCEED.getMessage();
        messageParser.msgSucceed(msg, deviceId, type, waterLogMapper.toDateList(list));
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

        String msg;
        String type = "waterlog_today";

        if (user == null) {
          msg = responseMessage.NO_USER_CONNECT.getMessage();
          messageParser.msgFail(msg, deviceId, type);
          return;
        }

        List<WaterLog> list = waterLogQueryDsl.findallByUserAndToday(user);
        msg = responseMessage.SUCCEED.getMessage();
        messageParser.msgSucceed(msg, deviceId, type, waterLogMapper.toList(list));
      }
    };
  }
}
