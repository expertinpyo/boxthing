package com.boxthing.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

public class MqttDto {
  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class MqttRequestDto {
    String deviceId;
    String type;
    Object data;
  }

  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class MqttResponseDto {
    String type;
    Object data;
  }

  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class MqttLogDto {
    String type;
    String value;
    String time;
  }
}
