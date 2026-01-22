package com.usermanagement.feature.user.mappers;

import com.usermanagement.feature.user.dto.UserResponseDto;
import com.usermanagement.feature.user.dto.UserScoreResponse;
import com.usermanagement.feature.user.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserScoreMapper {

    @Mapping(source = "userName", target = "username")
    UserScoreResponse toDto(User user);

    User toEntity(UserScoreResponse dto);
}
