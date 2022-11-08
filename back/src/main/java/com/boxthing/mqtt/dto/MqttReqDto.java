package com.boxthing.mqtt.dto;

import com.google.gson.annotations.SerializedName;
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

    T data;

    @Builder
    public MqttRequestDto(String deviceId, T data) {
      this.deviceId = deviceId;
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
    String timestamp;

    @Builder
    public MqttWaterReqData(Float amount, String timestamp) {
      this.amount = amount;
      this.timestamp = timestamp;
    }
  }

  @Getter
  @ToString
  @NoArgsConstructor
  public static class MqttWaterDaysReqData {
    Integer days;

    @Builder
    public MqttWaterDaysReqData(Integer days) {
      this.days = days;
    }
  }

  @Getter
  @ToString
  @NoArgsConstructor
  public static class MqttPostureReqData {
    @SerializedName("posture_score")
    Integer postureScore;

    String timestamp;

    @Builder
    public MqttPostureReqData(Integer postureScore, String timestamp) {
      this.postureScore = postureScore;
      this.timestamp = timestamp;
    }
  }
}
