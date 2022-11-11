package com.boxthing.mqtt;

import com.boxthing.enums.ResponseMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class MessageCreator {
  private final MessageParser messageParser;

  private String msg;

  ResponseMessage responseMessage;

  public void succeed(String deviceId, String topic, Object data) {
    msg = responseMessage.SUCCEED.getMessage();
    messageParser.msgSucceed(msg, deviceId, topic, data);
  }

  public void created(String deviceId, String topic, Object data) {
    msg = responseMessage.CREATED.getMessage();
    messageParser.msgSucceed(msg, deviceId, topic, data);
  }

  public void noSerialNumber(String deviceId, String topic, Object data) {
    msg = responseMessage.NO_SERIAL_NUMBER.getMessage();
    messageParser.msgFail(msg, deviceId, topic, data);
  }

  public void noUserConnect(String deviceId, String topic, Object data) {
    msg = responseMessage.NO_USER_CONNECT.getMessage();
    messageParser.msgFail(msg, deviceId, topic, data);
  }

  public void invalidToken(String deviceId, String topic, Object data) {
    msg = responseMessage.INVALID_TOKEN.getMessage();
    messageParser.msgFail(msg, deviceId, topic, data);
  }

  public void emptyResult(String deviceId, String topic, Object data) {
    msg = responseMessage.EMPTY_RESULT.getMessage();
    messageParser.msgFail(msg, deviceId, topic, data);
  }

  public void noGoogleToken(String deviceId, String topic, Object data) {
    msg = responseMessage.NO_GOOGLE_TOKEN.getMessage();
    messageParser.msgFail(msg, deviceId, topic, data);
  }

  public void noGithubToken(String deviceId, String topic, Object data) {
    msg = responseMessage.NO_GITHUB_TOKEN.getMessage();
    messageParser.msgFail(msg, deviceId, topic, data);
  }

  public void noInputData(String deviceId, String topic, Object data) {
    msg = responseMessage.NO_INPUT_DATA.getMessage();
    messageParser.msgFail(msg, deviceId, topic, data);
  }

  public void invalidInputData(String deviceId, String topic, Object data) {
    msg = responseMessage.INVALID_INPUT_VALUE.getMessage();
    messageParser.msgFail(msg, deviceId, topic, data);
  }

  public void loginFailed(String deviceId, String topic, Object data) {
    msg = responseMessage.LOGIN_FAILED.getMessage();
    messageParser.msgFail(msg, deviceId, topic, data);
  }

  public void alreadyRegistered(String deviceId, String topic, Object data) {
    msg = responseMessage.ALREAEDY_REGISTERED.getMessage();
    messageParser.msgFail(msg, deviceId, topic, data);
  }
}
