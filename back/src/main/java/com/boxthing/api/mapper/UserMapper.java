package com.boxthing.api.mapper;

import com.boxthing.api.domain.User;
import com.boxthing.api.dto.UserDto.UserGoogleRequestDto;
import com.boxthing.api.dto.UserDto.UserNullDto;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

  UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

  User toEntity(final UserGoogleRequestDto dto);

  @BeanMapping(
      nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
      nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
  void updateUserFromDto(UserGoogleRequestDto dto, @MappingTarget User user);

  void updateWithNull(UserNullDto dto, @MappingTarget User user);
}
