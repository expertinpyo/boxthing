package com.boxthing.api.v1.domain.mapper;

import com.boxthing.api.v1.domain.Device;
import com.boxthing.api.v1.dto.DeviceDto.DeviceRequestDto;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface DeviceMapper {

  DeviceMapper INSTANCE = Mappers.getMapper(DeviceMapper.class);

  Device toEntity(final DeviceRequestDto dto);

  @BeanMapping(
      nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
      nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
  void updateDeviceFromDto(DeviceRequestDto dto, @MappingTarget Device device);

  void updateStateNull(DeviceRequestDto dto, @MappingTarget Device device);
}
