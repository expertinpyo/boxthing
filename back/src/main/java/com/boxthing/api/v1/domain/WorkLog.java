package com.boxthing.api.v1.domain;

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
@Table(name = "worklog")
@NoArgsConstructor(access = AccessLevel.PROTECTED) // 초기화 느낌으로 필요한 듯 싶음
public class WorkLog extends BaseLogEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Integer time;

  @Builder
  public WorkLog(User user, Integer time) {
    super(user);
    this.time = time;
  }
}
