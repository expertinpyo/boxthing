package com.boxthing.config;

import com.boxthing.api.v1.repository.UserRepository;
import com.boxthing.security.oauth2.CustomAuthorizationRequestResolver;
import com.boxthing.security.oauth2.CustomSuccessHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.web.SecurityFilterChain;

// import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@EnableWebSecurity
@Slf4j
public class SecurityConfig {
  private final ClientRegistrationRepository clientRegistrationRepository;
  private final CustomSuccessHandler successHandler;

  private final UserRepository userRepository;

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
        .authorizationRequestResolver(
            new CustomAuthorizationRequestResolver(
                clientRegistrationRepository, "/oauth2/authorization", userRepository))
        .and()
        .redirectionEndpoint()
        .baseUri("/oauth2/callback/{registrationId}")
        .and()
        .successHandler(successHandler);

    return http.build();
  }

  // @Bean
  // FilterRegistrationBean<ForwardedHeaderFilter> forwardedHeaderFilter() {
  //   final FilterRegistrationBean<ForwardedHeaderFilter> filterRegistrationBean =
  //       new FilterRegistrationBean<ForwardedHeaderFilter>();

  //   filterRegistrationBean.setFilter(new ForwardedHeaderFilter());
  //   filterRegistrationBean.setOrder(Ordered.HIGHEST_PRECEDENCE);

  //   return filterRegistrationBean;
  // }
}
