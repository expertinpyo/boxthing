package com.boxthing.security.oauth2;

import com.boxthing.api.v1.domain.Device;
import com.boxthing.api.v1.domain.mapper.DeviceMapper;
import com.boxthing.api.v1.dto.DeviceDto.DeviceRequestDto;
import com.boxthing.api.v1.repository.DeviceRepository;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("qr")
@RequiredArgsConstructor
@Slf4j
public class QRCreator {
  private String serialNumber;

  private final DeviceRepository deviceRepository;
  private final DeviceMapper deviceMapper;

  @GetMapping("")
  public Object createQr(@RequestParam("serialNumber") String serialNumber)
      throws WriterException, IOException, NoSuchAlgorithmException {
    StringBuffer state = new StringBuffer();
    String hashType = "SHA-256";
    MessageDigest md;
    this.serialNumber = serialNumber;
    md = MessageDigest.getInstance(hashType);
    byte[] hashData = md.digest(this.serialNumber.getBytes());

    // SerialNumber hash화 진행
    for (byte b : hashData) {
      state.append(Integer.toString((b & 0xff) + 0x100, 16).substring(1));
    }

    log.info("hashed : {}", state);
    Device device = deviceRepository.findBySerialNumber(serialNumber);
    DeviceRequestDto dto = DeviceRequestDto.builder().state(String.valueOf(state)).build();

    deviceMapper.updateDeviceFromDto(dto, device);
    deviceRepository.save(device);
    int width = 200;
    int height = 200;
    UriComponents uri =
        UriComponentsBuilder.newInstance()
            .scheme("http")
            .host("localhost:8080")
            .path("/oauth2/authorization/google")
            .queryParam("state", state.toString())
            .build();

    BitMatrix matrix =
        new MultiFormatWriter().encode(uri.toString(), BarcodeFormat.QR_CODE, width, height);
    try (ByteArrayOutputStream out = new ByteArrayOutputStream(); ) {
      MatrixToImageWriter.writeToStream(matrix, "PNG", out);
      return ResponseEntity.ok();
    }
  }
}
