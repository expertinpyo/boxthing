package com.boxthing.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

public class MqttDto {
  @Getter
  @ToString
  @NoArgsConstructor
  public static class MqttRequestDto {
    String deviceId;
    String type;
    Object data;

    @Builder
    public MqttRequestDto(String deviceId, String type, Object data) {
      this.deviceId = deviceId;
      this.type = type;
      this.data = data;
    }
  }

  @Getter
  @ToString
  @NoArgsConstructor
  public static class MqttResponseDto {
    String type;
    Object data;

    @Builder
    public MqttResponseDto(String type, Object data) {
      this.type = type;
      this.data = data;
    }
  }

  @Getter
  @ToString
  @NoArgsConstructor
  public static class MqttLogDto {
    String type;
    String value;
    String time;

    @Builder
    public MqttLogDto(String type, String value, String time) {
      this.type = type;
      this.value = value;
      this.time = time;
    }
  }
}
