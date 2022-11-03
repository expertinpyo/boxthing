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
  public static class MqttProviderResDto {
    String provider;
    String link;

    @Builder
    public MqttProviderResDto(String provider, String link) {
      this.provider = provider;
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
    String provider;

    @Builder
    public MqttAccessTokenResDto(String accessToken, String provider) {
      this.accessToken = accessToken;
      this.provider = provider;
    }
  }
}
