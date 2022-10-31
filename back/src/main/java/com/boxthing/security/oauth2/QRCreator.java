package com.boxthing.security.oauth2;

import com.boxthing.api.v1.domain.Device;
import com.boxthing.api.v1.domain.mapper.DeviceMapper;
import com.boxthing.api.v1.dto.DeviceDto.DeviceRequestDto;
import com.boxthing.api.v1.repository.DeviceRepository;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("login")
@RequiredArgsConstructor
@Slf4j
public class QRCreator {

  private final DeviceRepository deviceRepository;
  private final DeviceMapper deviceMapper;

  // 이 클래스로부터 로직 진행됨
  public String hashedUri(String serialNumber, String site) throws NoSuchAlgorithmException {
    StringBuffer state = new StringBuffer();
    String hashType = "SHA-256";
    MessageDigest md;
    md = MessageDigest.getInstance(hashType);
    byte[] hashData = md.digest(serialNumber.getBytes());

    // SerialNumber hash화 진행
    for (byte b : hashData) {
      state.append(Integer.toString((b & 0xff) + 0x100, 16).substring(1));
    }

    log.info("hashed : {}", state);
    Device device = deviceRepository.findBySerialNumber(serialNumber);
    if (device == null) {
      return null;
    }

    DeviceRequestDto dto = DeviceRequestDto.builder().state(String.valueOf(state)).build();
    deviceMapper.updateDeviceFromDto(dto, device);
    deviceRepository.save(device);
    String path = "/oauth2/authorization/" + site;

    UriComponents uri =
        UriComponentsBuilder.newInstance()
            .scheme("http")
            .host("localhost:8080")
            .path(path)
            .queryParam("state", state.toString())
            .build();
    return uri.toString();
  }
}
