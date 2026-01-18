package com.usermanagement.feature.user.mappers;

import com.usermanagement.feature.user.dto.UserResponseDto;
import com.usermanagement.feature.user.dto.UserScoreResponse;
import com.usermanagement.feature.user.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserScoreMapper {

    UserScoreResponse toDto(User user);

    User toEntity(UserScoreResponse dto);
}
