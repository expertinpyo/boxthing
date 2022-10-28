package com.boxthing.api.v1.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Device {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String serialNumber;
  private String state; // device 식별을 위한 해쉬값 // 필드에 두는 것이 맞는지에 대한 생각을 다시 해보자

  @Builder
  public Device(String serialNumber, String state) {
    this.serialNumber = serialNumber;
    this.state = state;
  }
}
