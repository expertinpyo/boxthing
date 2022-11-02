package com.boxthing.api.repository;

import com.boxthing.api.domain.WorkLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkLogRepository extends JpaRepository<WorkLog, Long> {}
