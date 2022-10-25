package com.boxthing.api.v1.domain;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@NoArgsConstructor(access = AccessLevel.PROTECTED) // 빈 생성자, protected하게 접근
@Getter
@ToString
@EntityListeners(AuditingEntityListener.class)
@Table(name = "user")
@Entity
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 설정 db에 위임
  private Long id;

  private String username;
  private String googleRefreshJws;

  private String githubJws;

  @CreatedDate
  @Column(updatable = false, nullable = false)
  private LocalDateTime createdAt;

  @LastModifiedDate private LocalDateTime updatedAt;

  @Builder
  public User(String username, String googleRefreshJws, String githubJws) {
    this.username = username;
    this.googleRefreshJws = googleRefreshJws;
    this.githubJws = githubJws;
  }
}
