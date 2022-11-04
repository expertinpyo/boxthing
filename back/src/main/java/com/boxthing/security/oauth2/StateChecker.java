package com.boxthing.security.oauth2;

import com.boxthing.api.repository.DeviceRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class StateChecker {

  private final DeviceRepository deviceRepository;
}
