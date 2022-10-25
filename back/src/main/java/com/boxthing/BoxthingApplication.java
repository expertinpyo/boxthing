package com.boxthing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing // Auditing을 위한 어노테이션
public class BoxthingApplication {

  public static void main(String[] args) {
    SpringApplication.run(BoxthingApplication.class, args);
  }
}
