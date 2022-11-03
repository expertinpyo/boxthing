package com.boxthing.api.querydsl;

import com.boxthing.api.domain.QWaterLog;
import com.boxthing.api.domain.User;
import com.boxthing.api.domain.WaterLog;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class WaterLogQueryDsl {

  private final JPAQueryFactory jpaQueryFactory;
  private final QWaterLog waterLog = new QWaterLog("waterLog");

  public List<WaterLog> findAllByUserAndDate(User user, int before) {
    LocalDateTime toDate = LocalDateTime.now().minusDays(1);
    toDate.withHour(23).withMinute(59).withSecond(59);
    LocalDateTime startFrom = toDate.minusDays(before);
    startFrom.withHour(0).withHour(0).withSecond(0);

    return jpaQueryFactory
        .select(waterLog)
        .from(waterLog)
        .where(waterLog.user.eq(user), waterLog.createdAt.between(startFrom, toDate))
        .orderBy(waterLog.createdAt.asc())
        .fetch();
  }

  public List<WaterLog> findallByUserAndToday(User user) {
    LocalDateTime now = LocalDateTime.now();
    LocalDateTime startFrom = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
    return jpaQueryFactory
        .select(waterLog)
        .from(waterLog)
        .where(waterLog.user.eq(user), waterLog.createdAt.between(startFrom, now))
        .orderBy(waterLog.createdAt.asc())
        .fetch();
  }
}
