package com.boxthing.security.oauth2;

import com.boxthing.api.v1.domain.mapper.UserMapper;
import com.boxthing.api.v1.dto.UserDto.*;
import com.boxthing.api.v1.repository.UserRepository;
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

    log.info("regId: {}, accessToken: {}, state: {}\n", registrationId, accessToken, state);

    // google 인증 성공
    if (registrationId.equals("google")) {
      OAuth2RefreshToken maybeRefreshToken = client.getRefreshToken();
      if (maybeRefreshToken == null) {
        // no refresh token
        // TODO: login failure page
        return;
      }
      String refreshToken = maybeRefreshToken.getTokenValue();
      UserGoogleRequestDto userGoogleRequestDto =
          UserGoogleRequestDto.builder()
              .googleRefreshJws(refreshToken)
              .username(oauthToken.getName())
              .build();

      userRepository.save(userMapper.toEntity(userGoogleRequestDto));
      log.info("client: {}", oauthToken.getPrincipal());
      log.info("client: {}", oauthToken.getName());
      log.info("google OK, refreshToken: {}\n", refreshToken);
    }

    // github 인증 성공
    if (registrationId.equals("github")) {
      log.info("github OK\n");
    }
  }
}
