package com.boxthing.api.dto;

import com.boxthing.api.domain.User;
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
    private Long id;
    private String serialNumber;

    private User user;

    @Builder
    public DeviceRequestDto(String state, String serialNumber, Long id, User user) {
      this.id = id;
      this.state = state;
      this.serialNumber = serialNumber;
      this.user = user;
    }
  }
}
