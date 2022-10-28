package com.boxthing.api.v1.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

public class UserDto {

  @Getter
  @ToString
  @NoArgsConstructor
  public static class UserGoogleRequestDto {
    private String username;
    private String email;
    private String googleRefreshJws;
    private String githubJws;

    @Builder
    public UserGoogleRequestDto(
        String username, String email, String googleRefreshJws, String githubJws) {
      this.username = username;
      this.email = email;
      this.googleRefreshJws = googleRefreshJws;
      this.githubJws = githubJws;
    }
  }
}
