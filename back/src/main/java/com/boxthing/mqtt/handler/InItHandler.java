package com.boxthing.mqtt.handler;

import com.boxthing.api.domain.Device;
import com.boxthing.api.dto.DeviceDto.DeviceRequestDto;
import com.boxthing.api.mapper.DeviceMapper;
import com.boxthing.api.mapper.UserMapper;
import com.boxthing.api.repository.DeviceRepository;
import com.boxthing.api.repository.UserRepository;
import com.boxthing.config.MqttConfig.MqttOutboundGateway;
import com.boxthing.mqtt.dto.MqttDto.MqttRequestDto;
import com.boxthing.mqtt.dto.MqttDto.MqttResponseDto;
import com.boxthing.security.oauth2.QRCreator;
import com.google.gson.Gson;
import com.google.gson.internal.LinkedTreeMap;
import java.util.HashMap;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageHandler;
import org.springframework.messaging.MessagingException;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class InItHandler {
  private final MqttOutboundGateway gateway;
  private static final String BASE_TOPIC = "boxthing";
  private final Gson gson = new Gson();
  private final QRCreator qrCreator;

  private final DeviceRepository deviceRepository;
  private final DeviceMapper deviceMapper;

  private final UserRepository userRepository;
  private final UserMapper userMapper;

  public MessageHandler bootHandler() {
    return new MessageHandler() {
      @Override
      public void handleMessage(Message<?> message) throws MessagingException {
        MqttRequestDto requestDto = (MqttRequestDto) message.getPayload();
        String deviceId = requestDto.getDeviceId();
        Device device = deviceRepository.findBySerialNumber(deviceId);
        LinkedTreeMap<String, Boolean> data = new LinkedTreeMap<>();

        if (device == null) {
          data.put("is_registered", false);
          data.put("is_login", false);
        } else if (device.getUser() == null) {
          data.put("is_registered", true);
          data.put("is_login", false);
        } else {
          data.put("is_registered", true);
          data.put("is_login", true);
        }

        MqttResponseDto responseDto = MqttResponseDto.builder().type("init").data(data).build();
        gateway.publish(String.format("%s/%s", BASE_TOPIC, deviceId), gson.toJson(responseDto));
      }
    };
  }

  public MessageHandler registerHandler() {
    return new MessageHandler() {
      @Override
      public void handleMessage(Message<?> message) throws MessagingException {
        MqttRequestDto requestDto = (MqttRequestDto) message.getPayload();
        String deviceId = requestDto.getDeviceId();
        if (deviceRepository.findBySerialNumber(deviceId) != null) {
          log.info("Already existed Serial Number");
          return;
        }
        DeviceRequestDto deviceRequestDto =
            DeviceRequestDto.builder().serialNumber(deviceId).build();
        deviceRepository.save(deviceMapper.toEntity(deviceRequestDto));
        log.info("Device has been registered");
        HashMap is_registered = new HashMap<String, Boolean>();
        is_registered.put("is_registered", true);

        MqttResponseDto responseDto =
            MqttResponseDto.builder().type("register").data(is_registered).build();
        gateway.publish(String.format("%s/%s", BASE_TOPIC, deviceId), gson.toJson(responseDto));
      }
    };
  }
}
