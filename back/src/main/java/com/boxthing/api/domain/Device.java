package com.boxthing.api.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString(exclude = "user")
@NoArgsConstructor
public class Device {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(unique = true)
  private String serialNumber;

  private String state; // device 식별을 위한 해쉬값 // 필드에 두는 것이 맞는지에 대한 생각을 다시 해보자

  @OneToOne
  @JoinColumn(name = "user_id")
  private User user;

  @Builder
  public Device(String serialNumber, String state, User user) {
    this.serialNumber = serialNumber;
    this.state = state;
    this.user = user;
  }
}
