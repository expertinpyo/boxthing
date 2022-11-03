package com.boxthing.mqtt.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

public class MqttReqDto {

  @Getter
  @ToString
  @NoArgsConstructor
  public static class MqttRequestDto<T> {
    String deviceId;
    String type;
    T data;

    @Builder
    public MqttRequestDto(String deviceId, String type, T data) {
      this.deviceId = deviceId;
      this.type = type;
      this.data = data;
    }
  }

  @Getter
  @ToString
  @NoArgsConstructor
  public static class MqttProviderReqData {
    String provider;

    @Builder
    public MqttProviderReqData(String provider) {
      this.provider = provider;
    }
  }

  @Getter
  @ToString
  @NoArgsConstructor
  public static class MqttWaterReqData {
    Float amount;

    @Builder
    public MqttWaterReqData(Float amount) {
      this.amount = amount;
    }
  }

  @Getter
  @ToString
  @NoArgsConstructor
  public static class MqttWaterBeforeReqData {
    Integer before;

    @Builder
    public MqttWaterBeforeReqData(Integer before) {
      this.before = before;
    }
  }
}
