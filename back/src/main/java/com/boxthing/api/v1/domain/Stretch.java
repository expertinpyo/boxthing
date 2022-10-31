package com.boxthing.api.v1.domain;

import com.boxthing.Enums.StretchType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Stretch {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private StretchType type;
  private String description;

  @Builder
  public Stretch(StretchType type, String description) {
    this.type = type;
    this.description = description;
  }
}
