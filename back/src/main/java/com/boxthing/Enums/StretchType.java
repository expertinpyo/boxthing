package com.boxthing.Enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum StretchType {
  NECK("목"),
  WAIST("허리"),
  BODY("전신"),
  SHOULDER("어깨"),
  ARM("팔");

  private final String state;

  StretchType(String state) {
    this.state = state;
  }

  @JsonCreator
  public static StretchType from(String s) {
    return StretchType.valueOf(s.toUpperCase());
  }

  public String state() {
    return state;
  }
}
