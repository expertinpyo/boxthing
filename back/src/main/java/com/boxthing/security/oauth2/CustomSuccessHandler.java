package com.boxthing.security.oauth2;

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
    OAuth2RefreshToken hasRefreshToken = client.getRefreshToken();
    if (hasRefreshToken == null) {
      // no refresh token
      // TODO: login failure page
      return;
    }
    String refreshToken = hasRefreshToken.getTokenValue();
    String state = request.getParameter("state");

    log.info(
        "regId: {}, accessToken: {}, refreshToken: {}, state: {}\n",
        registrationId,
        accessToken,
        refreshToken,
        state);
  }
}
