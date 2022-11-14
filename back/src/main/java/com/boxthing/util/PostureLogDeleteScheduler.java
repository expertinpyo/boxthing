package com.boxthing.util;

import com.boxthing.api.querydsl.PostureLogQueryDsl;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class PostureLogDeleteScheduler {
  private final PostureLogQueryDsl postureLogQueryDsl;

  @Transactional
  @Scheduled(cron = "0 0 3 * * *")
  public void postureLogDelete() {
    postureLogQueryDsl.deleteAllWithoutToday();
    log.info("posture logs are deleted");
  }
}
