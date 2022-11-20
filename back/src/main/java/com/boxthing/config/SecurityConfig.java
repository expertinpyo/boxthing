package com.boxthing.config;

import com.boxthing.security.oauth2.CustomAuthorizationRequestResolver;
import com.boxthing.security.oauth2.CustomSuccessHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.filter.ForwardedHeaderFilter;

// import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@EnableWebSecurity
@Slf4j
public class SecurityConfig {

  // 이전에  WebSecurityConfigurerAdapter을 상속받아 configure 메서드를 오버라이딩 하는 방식이었으나
  // Spring Security 5.7.0 부터는 SecurityFilterChain을 빈으로 등록하여 사용하는 것을 권장함
  private final ClientRegistrationRepository clientRegistrationRepository;
  private final CustomSuccessHandler successHandler;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.httpBasic()
        .disable()
        .csrf()
        .disable()
        .formLogin()
        .disable()
        .logout()
        .disable()
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    http.oauth2Login()
        .authorizationEndpoint()
        .baseUri("/oauth2/authorization")
        // oauth2Login() / authorizationEndpoint() / authorizationRequestResolver()를 사용
        // => 사용자 정의 OAuth2AuthorizationRequestResolver를 삽입함
        .authorizationRequestResolver(
            new CustomAuthorizationRequestResolver(
                clientRegistrationRepository, "/oauth2/authorization"))
        .and()
        .redirectionEndpoint()
        .baseUri("/oauth2/callback/{registrationId}")
        .and()
        .successHandler(successHandler);

    return http.build();
  }

  @Bean
  FilterRegistrationBean<ForwardedHeaderFilter> forwardedHeaderFilter() {
    final FilterRegistrationBean<ForwardedHeaderFilter> filterRegistrationBean =
        new FilterRegistrationBean<ForwardedHeaderFilter>();

    filterRegistrationBean.setFilter(new ForwardedHeaderFilter());
    filterRegistrationBean.setOrder(Ordered.HIGHEST_PRECEDENCE);

    return filterRegistrationBean;
  }
}
