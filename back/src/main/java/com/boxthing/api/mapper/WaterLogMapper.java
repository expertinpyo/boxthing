package com.boxthing.api.mapper;

import com.boxthing.api.domain.WaterLog;
import com.boxthing.api.dto.WaterLogDto.WaterLogRequestDto;
import com.boxthing.api.dto.WaterLogDto.WaterLogResponseDto;
import com.google.gson.internal.LinkedTreeMap;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
@Slf4j
public abstract class WaterLogMapper {

  public abstract WaterLog toEntity(final WaterLogRequestDto dto);

  public List<LinkedTreeMap> toDateList(List<WaterLog> waterLogs, int days) {
    List<LinkedTreeMap> response = new ArrayList<>();

    LocalDate date = LocalDate.now().minusDays(days);

    for (int i = 0; i < days; i++) {
      LinkedTreeMap<String, Float> newDate = new LinkedTreeMap<String, Float>();
      newDate.put(date.plusDays(i).toString(), (float) 0);
      response.add(newDate);
    }

    String now = null;

    for (WaterLog waterLog : waterLogs) {
      String key = waterLog.getTimestamp().toLocalDate().toString();
      for (LinkedTreeMap<String, Float> map : response) {
        if (map.containsKey(key)) {
          map.put(key, map.get(key) + waterLog.getAmount());
          break;
        }
      }
    }

    return response;
  }

  public List<WaterLogResponseDto> toList(List<WaterLog> waterLogs) {
    List<WaterLogResponseDto> response = new ArrayList<WaterLogResponseDto>();
    for (WaterLog waterlog : waterLogs) {

      WaterLogResponseDto dto =
          WaterLogResponseDto.builder()
              .timestamp(waterlog.getTimestamp().toOffsetDateTime().toString())
              .amount(waterlog.getAmount())
              .build();
      response.add(dto);
    }
    return response;
  }
}
