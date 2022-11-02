package com.boxthing.api.repository;

import com.boxthing.api.domain.Device;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceRepository extends JpaRepository<Device, Long> {

  Device findBySerialNumber(String serialNumber);

  Device findByState(String state);
}
