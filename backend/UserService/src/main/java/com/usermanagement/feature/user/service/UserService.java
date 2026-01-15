package com.usermanagement.feature.user.service;

import com.usermanagement.feature.user.dto.UserUpdateRequestDto;
import com.usermanagement.feature.user.model.User;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

public interface UserService {

    Set<User> getAllUsers();

    User createFromToken(Jwt jwt);

    Optional<User> getLocalUser(String id);

    User updateUser(Jwt jwt, UserUpdateRequestDto userUpdateRequestDto);
}
