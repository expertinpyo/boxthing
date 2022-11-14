package com.boxthing.api.dto;

import com.boxthing.api.domain.Device;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

public class UserDto {

  @Getter
  @ToString
  @NoArgsConstructor
  public static class UserGoogleRequestDto {
    private String email;
    private String googleRefreshJws;
    private String githubJws;

    @Builder
    public UserGoogleRequestDto(String email, String googleRefreshJws, String githubJws) {
      this.email = email;
      this.googleRefreshJws = googleRefreshJws;
      this.githubJws = githubJws;
    }
  }

  @Getter
  @ToString
  @NoArgsConstructor
  public static class UserNullDto {
    private Long id;
    private String email;
    private String googleRefreshJws;
    private String githubJws;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Device device;

    @Builder
    public UserNullDto(
        Long id,
        String email,
        String googleRefreshJws,
        String githubJws,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        Device device) {
      this.id = id;
      this.email = email;
      this.googleRefreshJws = googleRefreshJws;
      this.githubJws = githubJws;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.device = device;
    }
  }
}
