package com.boxthing.api.dto;

import com.boxthing.api.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

public class PostureLogDto {
  @Getter
  @ToString
  @NoArgsConstructor
  public static class PostureLogRequestDto {
    private Integer postureScore;
    private User user;
    private String timestamp;

    @Builder
    public PostureLogRequestDto(Integer postureScore, User user, String timestamp) {
      this.postureScore = postureScore;
      this.user = user;
      this.timestamp = timestamp;
    }
  }

  @Getter
  @ToString
  @NoArgsConstructor
  public static class PostureLogResponseDto {
    private Integer postureScore;
    private String timestamp;

    @Builder
    public PostureLogResponseDto(Integer postureScore, String timestamp) {
      this.postureScore = postureScore;
      this.timestamp = timestamp;
    }
  }
}
