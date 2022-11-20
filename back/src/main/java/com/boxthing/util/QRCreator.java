package com.boxthing.util;

import com.boxthing.api.domain.Device;
import com.boxthing.api.dto.DeviceDto.DeviceRequestDto;
import com.boxthing.api.mapper.DeviceMapper;
import com.boxthing.api.repository.DeviceRepository;
import com.boxthing.config.QRProperties;
import java.nio.charset.Charset;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@RequiredArgsConstructor
@Slf4j
public class QRCreator {

  private final DeviceRepository deviceRepository;
  private final DeviceMapper deviceMapper;

  private final QRProperties qrProperties;
  // 이 클래스로부터 로직 진행됨
  public String hashedUri(String serialNumber, String site) throws NoSuchAlgorithmException {
    StringBuffer state = new StringBuffer();
    String hashType = "SHA-256";
    MessageDigest md;
    md = MessageDigest.getInstance(hashType);

    // Salt를 위한 랜덤 스트링 추가
    byte[] array = new byte[7]; // length is bounded by 7
    new Random().nextBytes(array);
    String generatedString = new String(array, Charset.forName("UTF-8"));
    // 시리얼 넘버와 랜덤 스트링 간 합
    String saltedString = serialNumber + generatedString;
    byte[] hashData = md.digest(saltedString.getBytes());

    // SerialNumber hash화 진행
    for (byte b : hashData) {
      state.append(Integer.toString((b & 0xff) + 0x100, 16).substring(1));
    }

    log.info("hashed : {}", state);
    Device device = deviceRepository.findBySerialNumber(serialNumber);

    DeviceRequestDto dto = DeviceRequestDto.builder().state(String.valueOf(state)).build();
    deviceMapper.updateDeviceFromDto(dto, device);
    deviceRepository.save(device);
    String path = "/oauth2/authorization/" + site;

    UriComponents uri =
        UriComponentsBuilder.newInstance()
            .scheme(qrProperties.getScheme())
            .host(qrProperties.getHost())
            .path(path)
            .queryParam("state", state.toString())
            .build();
    return uri.toString();
  }
}
