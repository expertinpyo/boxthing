package com.boxthing.api.dto;

import com.boxthing.api.domain.User;
import java.time.ZonedDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

public class WaterLogDto {

  @Getter
  @ToString
  @NoArgsConstructor
  public static class WaterLogRequestDto {
    private Float amount;
    private User user;
    private ZonedDateTime timestamp;

    @Builder
    public WaterLogRequestDto(Float amount, User user, ZonedDateTime timestamp) {
      this.amount = amount;
      this.user = user;
      this.timestamp = timestamp;
    }
  }

  @Getter
  @ToString
  @NoArgsConstructor
  public static class WaterLogResponseDto {
    private Float amount;
    private String timestamp;

    @Builder
    public WaterLogResponseDto(Float amount, String timestamp) {
      this.amount = amount;
      this.timestamp = timestamp;
    }
  }
}
