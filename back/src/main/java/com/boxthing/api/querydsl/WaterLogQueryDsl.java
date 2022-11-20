package com.boxthing.api.querydsl;

import com.boxthing.api.domain.QWaterLog;
import com.boxthing.api.domain.User;
import com.boxthing.api.domain.WaterLog;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.ZonedDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class WaterLogQueryDsl {

  private final JPAQueryFactory jpaQueryFactory;
  private final QWaterLog waterLog = new QWaterLog("waterLog");

  public List<WaterLog> findAllByUserAndDate(User user, int days) {
    ZonedDateTime end = ZonedDateTime.now().withHour(0).withMinute(0).withSecond(0);
    ZonedDateTime start = end.minusDays((long) days + 1).withHour(0).withMinute(0).withSecond(0);

    return jpaQueryFactory
        .select(waterLog)
        .from(waterLog)
        .where(waterLog.user.eq(user), waterLog.timestamp.between(start, end))
        .orderBy(waterLog.timestamp.asc())
        .fetch();
  }

  public List<WaterLog> findallByUserAndToday(User user) {
    ZonedDateTime end = ZonedDateTime.now();
    ZonedDateTime start = end.withHour(0).withMinute(0).withSecond(0);

    return jpaQueryFactory
        .select(waterLog)
        .from(waterLog)
        .where(waterLog.user.eq(user), waterLog.timestamp.between(start, end))
        .orderBy(waterLog.timestamp.asc())
        .fetch();
  }
}
