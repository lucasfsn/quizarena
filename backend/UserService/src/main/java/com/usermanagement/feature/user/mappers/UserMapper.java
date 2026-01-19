package com.usermanagement.feature.user.mappers;

import com.usermanagement.feature.user.dto.UserResponseDto;
import com.usermanagement.feature.user.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponseDto toDto(User user);

    User toEntity(UserResponseDto dto);

}