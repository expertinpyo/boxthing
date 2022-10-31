package com.boxthing.api.v1.repository;

import com.boxthing.api.v1.domain.User;
import com.boxthing.api.v1.domain.WaterLog;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WaterLogRepository extends JpaRepository<WaterLog, Long> {

  List<WaterLog> findAllByUser(User user);
}
