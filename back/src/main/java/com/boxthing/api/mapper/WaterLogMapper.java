package com.boxthing.api.mapper;

import com.boxthing.api.domain.WaterLog;
import com.boxthing.api.dto.WaterLogDto.WaterLogRequestDto;
import com.boxthing.api.dto.WaterLogDto.WaterLogResponseDto;
import com.google.gson.internal.LinkedTreeMap;
import java.util.ArrayList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
@Slf4j
public abstract class WaterLogMapper {

  public abstract WaterLog toEntity(final WaterLogRequestDto dto);

  public List<LinkedTreeMap> toDateList(List<WaterLog> waterLogs) {
    List<LinkedTreeMap> response = new ArrayList<>();
    String now = null;
    float cnt = 0;

    for (WaterLog waterLog : waterLogs) {
      if (now == null) {
        now = waterLog.getCreatedAt().toLocalDate().toString();
        cnt += waterLog.getAmount();
      } else if (now.equals(waterLog.getCreatedAt().toLocalDate().toString())) {
        cnt += waterLog.getAmount();
      } else {
        LinkedTreeMap<String, Float> result = new LinkedTreeMap<>();
        result.put(now, cnt);
        response.add(result);
        now = waterLog.getCreatedAt().toLocalDate().toString();
        cnt = waterLog.getAmount();
      }
    }
    LinkedTreeMap<String, Float> last = new LinkedTreeMap<>();
    last.put(now, cnt);
    response.add(last);
    return response;
  }

  public List<WaterLogResponseDto> toList(List<WaterLog> waterLogs) {
    List<WaterLogResponseDto> response = new ArrayList<WaterLogResponseDto>();
    for (WaterLog waterlog : waterLogs) {
      WaterLogResponseDto dto =
          WaterLogResponseDto.builder()
              .createdAt(waterlog.getCreatedAt())
              .amount(waterlog.getAmount())
              .build();
      response.add(dto);
    }
    return response;
  }
}
