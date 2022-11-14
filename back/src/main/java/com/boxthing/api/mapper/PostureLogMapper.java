package com.boxthing.api.mapper;

import com.boxthing.api.domain.PostureLog;
import com.boxthing.api.dto.PostureLogDto.PostureLogRequestDto;
import com.boxthing.api.dto.PostureLogDto.PostureLogResponseDto;
import java.util.ArrayList;
import java.util.List;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public abstract class PostureLogMapper {

  public abstract PostureLog toEntity(final PostureLogRequestDto dto);

  public List<PostureLogResponseDto> toList(List<PostureLog> postureLogs) {
    List<PostureLogResponseDto> response = new ArrayList<PostureLogResponseDto>();
    for (PostureLog posturelog : postureLogs) {

      PostureLogResponseDto dto =
          PostureLogResponseDto.builder()
              .timestamp(posturelog.getTimestamp().toOffsetDateTime().toString())
              .postureScore(posturelog.getPostureScore())
              .build();
      response.add(dto);
    }
    return response;
  }
}
