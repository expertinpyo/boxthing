package com.boxthing.api.querydsl;

import com.boxthing.api.domain.PostureLog;
import com.boxthing.api.domain.QPostureLog;
import com.boxthing.api.domain.User;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.ZonedDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class PostureLogQueryDsl {
  private final JPAQueryFactory jpaQueryFactory;
  private final QPostureLog postureLog = new QPostureLog("postureLog");

  public List<PostureLog> findAllByUserAndToday(User user) {
    ZonedDateTime end = ZonedDateTime.now();
    ZonedDateTime start = end.withHour(0).withMinute(0).withSecond(0);
    return jpaQueryFactory
        .select(postureLog)
        .from(postureLog)
        .where(postureLog.user.eq(user), postureLog.timestamp.between(start, end))
        .orderBy(postureLog.timestamp.asc())
        .fetch();
  }

  public void deleteAllWithoutToday() {
    ZonedDateTime start = ZonedDateTime.now().withHour(0).withMinute(0).withSecond(0);
    ZonedDateTime end = start.plusDays(1);

    jpaQueryFactory.delete(postureLog).where(postureLog.timestamp.notBetween(start, end)).execute();
  }
}
