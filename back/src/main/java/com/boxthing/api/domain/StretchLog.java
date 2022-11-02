package com.boxthing.api.domain;

import com.boxthing.Enums.StretchType;
import com.boxthing.api.inheritance.BaseLogEntity;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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

  @ManyToOne(targetEntity = User.class, cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private User user;

  @Builder
  public StretchLog(User user, StretchType type) {
    this.user = user;
    this.type = type;
  }
}
