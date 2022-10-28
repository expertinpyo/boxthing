package com.boxthing.security.oauth2;

import com.boxthing.api.v1.repository.DeviceRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class StateChecker {

  private final DeviceRepository deviceRepository;

  public boolean IsStateValid(String state) {
    return deviceRepository.findByState(state);
  }
}
