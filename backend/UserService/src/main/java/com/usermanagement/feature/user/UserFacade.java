package com.usermanagement.feature.user;

import com.usermanagement.feature.user.dto.PlayerGameResultResponse;
import com.usermanagement.feature.user.dto.UserResponseDto;
import com.usermanagement.feature.user.dto.UserScoreResponse;
import com.usermanagement.feature.user.dto.UserUpdateRequestDto;
import com.usermanagement.feature.user.mappers.UserMapper;
import com.usermanagement.feature.user.mappers.UserScoreMapper;
import com.usermanagement.feature.user.model.User;
import com.usermanagement.feature.user.service.KeycloakUserService;
import com.usermanagement.feature.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserFacade {

    private final UserService userService;

    private final KeycloakUserService keycloakUserService;
    private final UserMapper userMapper;
    private final UserScoreMapper userScoreMapper;

    public UserResponseDto getAndSyncUser(Jwt jwt) {

        UUID userId = UUID.fromString(jwt.getSubject());

        User user = userService.getLocalUser(userId)
                .orElseGet(() -> userService.createFromToken(jwt));

        return UserResponseDto.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .username(user.getUserName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .build();
    }

    public UserResponseDto updateUser(Jwt jwt, UserUpdateRequestDto userUpdateRequestDto) {

        keycloakUserService.updateUser(jwt, userUpdateRequestDto);
        User user = userService.updateUser(jwt, userUpdateRequestDto);

        return UserResponseDto.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .username(user.getUserName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .build();
    }

    public Set<UserScoreResponse> getAllUsers() {
        return userService.getAllUsers().stream().map(userScoreMapper::toDto).collect(Collectors.toSet());
    }

    public void resetPassword(Jwt jwt, String password) {
        keycloakUserService.resetPassword(jwt, password);
    }

    public void updateUserStats(List<PlayerGameResultResponse> playerGameResultResponseList) {
        userService.updateUserStatistics(playerGameResultResponseList);
    }

}
