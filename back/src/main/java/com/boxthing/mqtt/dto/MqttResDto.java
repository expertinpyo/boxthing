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
    String topic;

    Boolean success;
    String message;
    Object data;

    @Builder
    public MqttResponseDto(String topic, Object data, String message, Boolean success) {
      this.topic = topic;
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

    String googleAccessToken;
    String githubAccessToken;

    @Builder
    public MqttLoginResDto(String googleAccessToken, String githubAccessToken) {
      this.googleAccessToken = googleAccessToken;
      this.githubAccessToken = githubAccessToken;
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
