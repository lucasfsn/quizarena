package com.usermanagement.feature.user.service;

import com.usermanagement.feature.user.dto.UserUpdateRequestDto;
import org.springframework.security.oauth2.jwt.Jwt;

public interface KeycloakUserService {

    void updateUser(Jwt jwt, UserUpdateRequestDto userUpdateRequestDto);
}
