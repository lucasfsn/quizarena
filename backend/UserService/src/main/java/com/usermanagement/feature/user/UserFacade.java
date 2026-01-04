package com.usermanagement.feature.user;

import com.usermanagement.feature.user.dto.UserResponseDto;
import com.usermanagement.feature.user.model.User;
import com.usermanagement.feature.user.service.UserService;
import com.usermanagement.feature.user.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserFacade {

    private final UserService userService;

    public UserResponseDto getAndSyncUser(Jwt jwt) {

        String userId = jwt.getSubject();

        User user = userService.getLocalUser(userId)
                .orElseGet(() -> userService.createFromToken(jwt));

        return UserResponseDto.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .build();
    }
}
