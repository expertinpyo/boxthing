package com.boxthing.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "mqtt")
@Data
public class MqttProperties {
  private String BASE_TOPIC;
  private String BROKER_URL;
}
