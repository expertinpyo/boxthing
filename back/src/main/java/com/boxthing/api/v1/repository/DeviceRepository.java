package com.boxthing.api.v1.repository;

import com.boxthing.api.v1.domain.Device;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceRepository extends JpaRepository<Device, Long> {

  Device findBySerialNumber(String serialNumber);

  boolean findByState(String state);
}
