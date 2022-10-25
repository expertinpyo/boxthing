package com.boxthing.api.v1.domain.mapper;

import com.boxthing.api.v1.domain.User;
import com.boxthing.api.v1.dto.UserDto.UserGoogleRequestDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

  User toEntity(final UserGoogleRequestDto dto);
}
