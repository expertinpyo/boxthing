package com.boxthing.api.v1.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

public class DeviceDto {

  @Getter
  @ToString
  @NoArgsConstructor
  public static class DeviceRequestDto {
    private String state;

    @Builder
    public DeviceRequestDto(String state) {
      this.state = state;
    }
  }
}
