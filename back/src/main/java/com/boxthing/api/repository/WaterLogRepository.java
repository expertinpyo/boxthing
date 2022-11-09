package com.boxthing.api.repository;

import com.boxthing.api.domain.User;
import com.boxthing.api.domain.WaterLog;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WaterLogRepository extends JpaRepository<WaterLog, Long> {

  List<WaterLog> findAllByUser(User user);
}
