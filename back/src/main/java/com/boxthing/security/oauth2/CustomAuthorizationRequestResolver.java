package com.boxthing.security.oauth2;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;

@Slf4j
public class CustomAuthorizationRequestResolver implements OAuth2AuthorizationRequestResolver {
  private final OAuth2AuthorizationRequestResolver defaultAuthorizationRequestResolver;

  public CustomAuthorizationRequestResolver(
      ClientRegistrationRepository clientRegistrationRepository,
      String authorizationRequestBaseUri) {
    this.defaultAuthorizationRequestResolver =
        new DefaultOAuth2AuthorizationRequestResolver(
            clientRegistrationRepository, authorizationRequestBaseUri);
  }

  @Override
  public OAuth2AuthorizationRequest resolve(HttpServletRequest request) {
    OAuth2AuthorizationRequest authorizationRequest =
        this.defaultAuthorizationRequestResolver.resolve(request);

    if (authorizationRequest == null) {
      return null;
    }

    String state = request.getParameter("state");

    if (state == null) {
      return null;
    }

    return customAuthorizationRequest(authorizationRequest, state);
  }

  @Override
  public OAuth2AuthorizationRequest resolve(
      HttpServletRequest request, String clientRegistrationId) {
    OAuth2AuthorizationRequest authorizationRequest =
        this.defaultAuthorizationRequestResolver.resolve(request, clientRegistrationId);

    if (authorizationRequest == null) {
      return null;
    }

    String state = request.getParameter("state");

    if (state == null) {
      return null;
    }

    return customAuthorizationRequest(authorizationRequest, state);
  }

  private OAuth2AuthorizationRequest customAuthorizationRequest(
      OAuth2AuthorizationRequest authorizationRequest, String state) {
    Map<String, Object> additionalParameters =
        new HashMap<>(authorizationRequest.getAdditionalParameters());
    additionalParameters.put("access_type", "offline");
    additionalParameters.put("prompt", "consent");

    return OAuth2AuthorizationRequest.from(authorizationRequest)
        .additionalParameters(additionalParameters)
        .state(state)
        .build();
  }
}
