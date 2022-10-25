package com.boxthing.api.v1.domain;

import com.boxthing.Enums.StretchType;
import com.boxthing.api.v1.domain.inheritance.BaseLogEntity;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@ToString
@Table(name = "stretchlog")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StretchLog extends BaseLogEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private StretchType type;

  @Builder
  public StretchLog(User user, StretchType type) {
    super(user);
    this.type = type;
  }
}
