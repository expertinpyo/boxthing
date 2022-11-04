package com.boxthing.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "mqtt")
@Data
public class MqttProperties {
  private String baseTopic;
  private String brokerUrl;
}
