package com.boxthing.api.v1.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

public class UserDto {

  @Getter
  @ToString
  public static class UserGoogleRequestDto {
    private String username;
    private String googleRefreshJws;
    private String githubJws;

    @Builder
    public UserGoogleRequestDto(String username, String googleRefreshJws, String githubJws) {
      this.username = username;
      this.googleRefreshJws = googleRefreshJws;
      this.githubJws = githubJws;
    }
  }
}
