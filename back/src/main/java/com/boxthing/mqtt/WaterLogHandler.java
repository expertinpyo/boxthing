package com.boxthing.mqtt;

import com.boxthing.api.v1.domain.Device;
import com.boxthing.api.v1.domain.User;
import com.boxthing.api.v1.domain.WaterLog;
import com.boxthing.api.v1.domain.mapper.WaterLogMapper;
import com.boxthing.api.v1.dto.WaterLogDto.WaterLogRequestDto;
import com.boxthing.api.v1.repository.DeviceRepository;
import com.boxthing.api.v1.repository.WaterLogRepository;
import com.boxthing.config.MqttConfig.MqttOutboundGateway;
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
public class WaterLogHandler {
  private final MqttOutboundGateway gateway;
  private static final String BASE_TOPIC = "boxthing";
  private final Gson gson = new Gson();
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
        Double data = (Double) requestDto.getData();
        log.info("device id : {}", deviceId);
        log.info("device : {}", deviceRepository.findBySerialNumber(deviceId));
        Device device = deviceRepository.findBySerialNumber(deviceId);
        User user = device.getUser();
        log.info("user : {}", user);
        WaterLogRequestDto waterDto =
            WaterLogRequestDto.builder().amount(data.floatValue()).user(user).build();
        log.info("waterDto, {}", waterDto.toString());
        waterLogRepository.save(waterLogMapper.toEntity(waterDto));
      }
    };
  }

  public MessageHandler waterGetHandler() {
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

        List<WaterLog> list = waterLogRepository.findAllByUser(user);
        log.info("{}", list.toString());
        MqttResponseDto responseDto =
            MqttResponseDto.builder().type("waterGet").data(waterLogMapper.toList(list)).build();
        log.info("response : {}", responseDto);
        //        gateway.publish(String.format("%s/%s", BASE_TOPIC, deviceId),
        // gson.toJson(responseDto));
      }
    };
  }
}
