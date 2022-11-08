package com.boxthing.mqtt.handler;

import static com.boxthing.mqtt.handler.MqttInboundHandler.responseMessage;
import static com.boxthing.util.UtilMethods.jsonConverter;

import com.boxthing.api.domain.Device;
import com.boxthing.api.domain.PostureLog;
import com.boxthing.api.domain.User;
import com.boxthing.api.dto.PostureLogDto.PostureLogRequestDto;
import com.boxthing.api.mapper.PostureLogMapper;
import com.boxthing.api.querydsl.PostureLogQueryDsl;
import com.boxthing.api.repository.DeviceRepository;
import com.boxthing.api.repository.PostureLogRepository;
import com.boxthing.mqtt.MessageParser;
import com.boxthing.mqtt.dto.MqttReqDto.MqttPostureReqData;
import com.boxthing.mqtt.dto.MqttReqDto.MqttRequestDto;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.time.ZonedDateTime;
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
public class PostureLogHandler {

  private final PostureLogRepository postureLogRepository;
  private final DeviceRepository deviceRepository;
  private final MessageParser messageParser;
  private final PostureLogMapper postureLogMapper;

  private final PostureLogQueryDsl postureLogQueryDsl;

  @Bean
  @ServiceActivator(inputChannel = "mqtt-posture")
  public MessageHandler postureHandler() {
    return message -> {
      Type typeToken = new TypeToken<MqttRequestDto<MqttPostureReqData>>() {}.getType();
      MqttRequestDto<MqttPostureReqData> requestDto =
          jsonConverter(message.getPayload(), typeToken);

      ZonedDateTime time = ZonedDateTime.parse(requestDto.getData().getTimestamp());
      String deviceId = requestDto.getDeviceId();
      MqttPostureReqData data = requestDto.getData();
      String msg;
      String topic = "posture";

      if (data == null) {
        msg = responseMessage.NO_INPUT_DATA.getMessage();
        messageParser.msgFail(msg, deviceId, topic, null);
        return;
      }
      if (data.getPostureScore() == null) {
        msg = responseMessage.INVALID_INPUT_VALUE.getMessage();
        messageParser.msgFail(msg, deviceId, topic, null);
        return;
      }

      log.info("posture request data : {}", data);
      Integer postureScore = data.getPostureScore();

      Device device = deviceRepository.findBySerialNumber(deviceId);
      User user = device.getUser();

      PostureLogRequestDto postureDto =
          PostureLogRequestDto.builder()
              .postureScore(postureScore)
              .timestamp(time.toString())
              .user(user)
              .build();
      postureLogRepository.save(postureLogMapper.toEntity(postureDto));
      msg = responseMessage.CREATED.getMessage();

      messageParser.msgSucceed(msg, deviceId, topic, null);
    };
  }

  @Bean
  @ServiceActivator(inputChannel = "mqtt-log/posture/today")
  public MessageHandler postureLogTodayHanlder() {
    return message -> {
      MqttRequestDto requestDto = (MqttRequestDto) message.getPayload();
      String deviceId = requestDto.getDeviceId();

      Device device = deviceRepository.findBySerialNumber(deviceId);

      String msg;
      String topic = "log/posture/today";

      if (device == null) {
        msg = responseMessage.NO_SERIAL_NUMBER.getMessage();
        messageParser.msgFail(msg, deviceId, topic, null);
        return;
      }
      User user = device.getUser();

      if (user == null) {
        msg = responseMessage.NO_USER_CONNECT.getMessage();
        messageParser.msgFail(msg, deviceId, topic, null);
        return;
      }

      List<PostureLog> list = postureLogQueryDsl.findallByUserAndToday(user);
      msg = responseMessage.SUCCEED.getMessage();
      messageParser.msgSucceed(msg, deviceId, topic, postureLogMapper.toList(list));
    };
  }
}
