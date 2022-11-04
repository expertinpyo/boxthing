package com.boxthing.enums;

public enum ResponseMessage {
  SUCCEED("요청 성공"),
  CREATED("데이터 생성 완료"),
  NO_SERIAL_NUMBER("DB에 등록되지 않은 장비"),
  NO_USER_CONNECT("해당 장비와 연결된 유저 없음"),
  TOKEN_EXPIRED("토큰 만료"),
  BAD_REQUEST("올바르지 않은 요청"),
  BAD_ACCESSMENT("올바르지 않은 접근"),
  LOGIN_FAILED("로그인 실패"),
  EMPTY_RESULT("결과 값 없음"),
  ;

  private String message;

  ResponseMessage(String message) {
    this.message = message;
  }

  public String getMessage() {
    return message;
  }
}
