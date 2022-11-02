package com.boxthing.api.dto;

import com.boxthing.api.domain.User;
import java.time.LocalDateTime;
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

    @Builder
    public WaterLogRequestDto(Float amount, User user) {
      this.user = user;
      this.amount = amount;
    }
  }

  @Getter
  @ToString
  @NoArgsConstructor
  public static class WaterLogResponseDto {
    private Float amount;
    private LocalDateTime createdAt;

    @Builder
    public WaterLogResponseDto(Float amount, LocalDateTime createdAt) {
      this.amount = amount;
      this.createdAt = createdAt;
    }
  }
}
