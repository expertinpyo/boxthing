package com.boxthing.security.oauth2;

import com.boxthing.api.domain.Device;
import com.boxthing.api.domain.User;
import com.boxthing.api.dto.DeviceDto.DeviceRequestDto;
import com.boxthing.api.dto.UserDto.*;
import com.boxthing.api.mapper.DeviceMapper;
import com.boxthing.api.mapper.UserMapper;
import com.boxthing.api.repository.DeviceRepository;
import com.boxthing.api.repository.UserRepository;
import com.boxthing.enums.ResponseMessage;
import com.boxthing.mqtt.MessageParser;
import com.boxthing.mqtt.dto.MqttResDto.MqttAccessTokenResDto;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2RefreshToken;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

  private final OAuth2AuthorizedClientService clientService;

  private final UserRepository userRepository;
  private final UserMapper userMapper;

  private final DeviceRepository deviceRepository;
  private final DeviceMapper deviceMapper;

  private final MessageParser messageParser;

  private static ResponseMessage responseMessage;

  @Override
  public void onAuthenticationSuccess(
      HttpServletRequest request, HttpServletResponse response, Authentication authentication)
      throws IOException, ServletException {
    OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;

    OAuth2AuthorizedClient client =
        clientService.loadAuthorizedClient(
            oauthToken.getAuthorizedClientRegistrationId(), oauthToken.getName());

    String registrationId = oauthToken.getAuthorizedClientRegistrationId();
    String accessToken = client.getAccessToken().getTokenValue();
    String state = request.getParameter("state");
    String type = "login";
    Device device = deviceRepository.findByState(state);
    if (device == null) {
      return;
    }
    // google 인증 성공
    if (registrationId.equals("google")) {
      OAuth2RefreshToken maybeRefreshToken = client.getRefreshToken();
      if (maybeRefreshToken == null) {
        // no refresh token
        String msg = responseMessage.LOGIN_FAILED.getMessage();
        messageParser.msgFail(msg, device.getSerialNumber(), type);
        return;
      }
      String refreshToken = maybeRefreshToken.getTokenValue();
      String email = oauthToken.getPrincipal().getAttribute("email");

      User user = userRepository.findByEmail(email);

      if (user != null) {

        UserGoogleRequestDto dto =
            UserGoogleRequestDto.builder().googleRefreshJws(refreshToken).build();
        userMapper.updateUserFromDto(dto, user);
        log.info("user updated : {} {}", user.toString(), state);
        userRepository.save(user);

      } else {
        UserGoogleRequestDto dto =
            UserGoogleRequestDto.builder().email(email).googleRefreshJws(refreshToken).build();
        user = userRepository.save(userMapper.toEntity(dto));
        log.info("New user created : {} {}", user.toString(), state);
      }
      // 이렇게 DB에 user 정보 저장 후 access token return 하는 방식으로 하면 될 듯
      // access token 반환 + state값 확인, right?
      DeviceRequestDto dto =
          DeviceRequestDto.builder()
              .state(null)
              .serialNumber(device.getSerialNumber())
              .id(device.getId())
              .user(user)
              .build();
      deviceMapper.updateWithNull(dto, device);
      deviceRepository.save(device);
      String msg = responseMessage.SUCCEED.getMessage();
      MqttAccessTokenResDto accessTokenResDto =
          MqttAccessTokenResDto.builder().accessToken(accessToken).provider("google").build();
      messageParser.msgSucceed(msg, device.getSerialNumber(), type, accessTokenResDto);
    }

    // github 인증 성공
    if (registrationId.equals("github")) {
      log.info("github");
      User user = device.getUser();
      UserGoogleRequestDto dto = UserGoogleRequestDto.builder().githubJws(accessToken).build();
      userMapper.updateUserFromDto(dto, user);
      userRepository.save(user);
      String msg = responseMessage.SUCCEED.getMessage();
      MqttAccessTokenResDto accessTokenResDto =
          MqttAccessTokenResDto.builder().accessToken(accessToken).provider("github").build();
      messageParser.msgSucceed(msg, device.getSerialNumber(), type, accessTokenResDto);

      DeviceRequestDto deviceDto =
          DeviceRequestDto.builder()
              .state(null)
              .serialNumber(device.getSerialNumber())
              .id(device.getId())
              .user(user)
              .build();
      deviceMapper.updateWithNull(deviceDto, device);
      deviceRepository.save(device);
    }
  }
}
