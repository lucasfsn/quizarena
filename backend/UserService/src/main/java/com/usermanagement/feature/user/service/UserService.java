package com.usermanagement.feature.user.service;

import com.usermanagement.feature.user.model.User;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Optional;

public interface UserService {


    User createFromToken(Jwt jwt);

    Optional<User> getLocalUser(String id);
}
