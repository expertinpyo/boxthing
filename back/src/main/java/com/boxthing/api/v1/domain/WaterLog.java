package com.boxthing.api.v1.domain;

import com.boxthing.api.v1.domain.inheritance.BaseLogEntity;
import javax.persistence.Entity;
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
@Table(name = "waterlog")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class WaterLog extends BaseLogEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Float amount;

  @ManyToOne(targetEntity = User.class)
  @JoinColumn(name = "user_id")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private User user;

  @Builder
  public WaterLog(Float amount, User user) {
    this.amount = amount;
    this.user = user;
  }
}
