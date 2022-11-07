package com.boxthing.mqtt.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

public class MqttResDto {
  @Getter
  @ToString
  @NoArgsConstructor
  public static class MqttResponseDto {
    String type;

    Boolean success;
    String message;
    Object data;

    @Builder
    public MqttResponseDto(String type, Object data, String message, Boolean success) {
      this.type = type;
      this.data = data;
      this.message = message;
      this.success = success;
    }
  }

  @Getter
  @ToString
  @NoArgsConstructor
  public static class MqttProviderResDto {
    String link;

    @Builder
    public MqttProviderResDto(String link) {
      this.link = link;
    }
  }

  @Setter
  @Getter
  @ToString
  @NoArgsConstructor
  public static class MqttLoginResDto {

    Boolean isLogin;

    @Builder
    public MqttLoginResDto(Boolean isLogin) {
      this.isLogin = isLogin;
    }
  }

  @Setter
  @Getter
  @ToString
  @NoArgsConstructor
  public static class MqttAccessTokenResDto {
    String accessToken;

    @Builder
    public MqttAccessTokenResDto(String accessToken) {
      this.accessToken = accessToken;
    }
  }
}
