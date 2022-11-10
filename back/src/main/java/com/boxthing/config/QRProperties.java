package com.boxthing.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "urlmaker")
@Data
public class QRProperties {
  private String scheme;
  private String host;
}
