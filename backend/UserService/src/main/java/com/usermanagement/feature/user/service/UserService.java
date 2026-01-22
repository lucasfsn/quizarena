package com.usermanagement.feature.user.service;

import com.usermanagement.feature.user.dto.PlayerGameResultResponse;
import com.usermanagement.feature.user.dto.UserUpdateRequestDto;
import com.usermanagement.feature.user.model.User;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface UserService {

    Page<User> getAllUsers(Pageable pageable);

    User createFromToken(Jwt jwt);

    Optional<User> getLocalUser(UUID id);

    User updateUser(Jwt jwt, UserUpdateRequestDto userUpdateRequestDto);

    void updateUserStatistics(List<PlayerGameResultResponse> playerGameResultResponseList);
}
