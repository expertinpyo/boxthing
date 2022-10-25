package com.boxthing.api.v1.repository;

import com.boxthing.api.v1.domain.WorkLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkLogRepository extends JpaRepository<WorkLog, Long> {}
