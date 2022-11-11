package com.boxthing.api.repository;

import com.boxthing.api.domain.Device;
import com.boxthing.api.domain.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceRepository extends JpaRepository<Device, Long> {

  Device findBySerialNumber(String serialNumber);

  Device findByState(String state);

  List<Device> findAllByUser(User user);
}
