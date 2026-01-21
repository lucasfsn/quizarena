package com.usermanagement.feature.user.mappers;

import com.usermanagement.feature.user.dto.UserScoreResponse;
import com.usermanagement.feature.user.dto.UsersLeaderboardDto;
import com.usermanagement.feature.user.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserLeaderboardMapper {

    UsersLeaderboardDto toDto(User user);

    User toEntity(UsersLeaderboardDto dto);
}
