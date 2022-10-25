package com.boxthing.api.v1.repository;

import com.boxthing.api.v1.domain.WaterLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WaterLogRepository extends JpaRepository<WaterLog, Long> {}
