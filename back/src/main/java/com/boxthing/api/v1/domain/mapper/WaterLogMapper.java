package com.boxthing.api.v1.domain.mapper;

import com.boxthing.api.v1.domain.WaterLog;
import com.boxthing.api.v1.dto.WaterLogDto.WaterLogRequestDto;
import com.boxthing.api.v1.dto.WaterLogDto.WaterLogResponseDto;
import java.util.ArrayList;
import java.util.List;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public abstract class WaterLogMapper {

  public abstract WaterLog toEntity(final WaterLogRequestDto dto);

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
