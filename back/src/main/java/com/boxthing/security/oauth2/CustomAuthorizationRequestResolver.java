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
  //  OAuth2AuthorizationRequestResolver => OAuth2 API가 표준과 다를 때 커스터마이징 하기 위해 implements 받음
  private final OAuth2AuthorizationRequestResolver defaultAuthorizationRequestResolver;

  public CustomAuthorizationRequestResolver(
      ClientRegistrationRepository clientRegistrationRepository,
      String authorizationRequestBaseUri) {
    this.defaultAuthorizationRequestResolver =
        new DefaultOAuth2AuthorizationRequestResolver(
            clientRegistrationRepository, authorizationRequestBaseUri);
    // 자체 OAuth2AuthorizationRequestResolver를 구현하기 위한 생성자
    // 기본기능을 위해 DefaultOAuth2AuthorizationRequestResolver를 사용
  }

  // reslove 메서드 재정의 => 사용자 지정 논리 추가(우리한테는 state 정의, 식별 코드, 하드웨어)
  @Override
  public OAuth2AuthorizationRequest resolve(HttpServletRequest request) {
    OAuth2AuthorizationRequest authorizationRequest =
        this.defaultAuthorizationRequestResolver.resolve(request);

    if (authorizationRequest == null) {
      return null;
    }
    String state = request.getParameter("state");
    // 기기 식별을 위해 해쉬화된 값, 해쉬화는 QRCreator에서 진행
    // state check 로직 정의해야 함
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

  // customizedAuthorizationRequest 메서드를 사용해 사용자 지정을 추가하는 로직
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
