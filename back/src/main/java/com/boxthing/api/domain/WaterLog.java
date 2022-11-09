package com.boxthing.api.domain;

import java.time.ZonedDateTime;
import javax.persistence.Column;
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
public class WaterLog {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Float amount;

  @Column(updatable = false, nullable = false)
  private ZonedDateTime timestamp;

  @ManyToOne(targetEntity = User.class)
  @JoinColumn(name = "user_id")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private User user;

  @Builder
  public WaterLog(Float amount, ZonedDateTime timestamp, User user) {
    this.amount = amount;
    this.timestamp = timestamp;
    this.user = user;
  }
}
