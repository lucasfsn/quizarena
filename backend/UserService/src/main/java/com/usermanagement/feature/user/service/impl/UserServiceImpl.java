package com.usermanagement.feature.user.service.impl;

import com.usermanagement.feature.user.dto.UserUpdateRequestDto;
import com.usermanagement.feature.user.model.User;
import com.usermanagement.feature.user.repository.UserRepository;
import com.usermanagement.feature.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public Optional<User> getLocalUser(String id) {
        return userRepository.findById(id);
    }

    @Override
    public User createFromToken(Jwt jwt) {
        User user = new User();
        user.setId(jwt.getSubject());
        user.setEmail(jwt.getClaimAsString("email"));
        user.setFirstName(jwt.getClaimAsString("given_name"));
        user.setLastName(jwt.getClaimAsString("family_name"));
        user.setUserName(jwt.getClaimAsString("preferred_username"));

        return userRepository.save(user);
    }

    @Override
    public User updateUser(Jwt jwt, UserUpdateRequestDto userUpdateRequestDto) {

        User user = getLocalUser(jwt.getSubject()).orElse(null);

        user.setUserName(userUpdateRequestDto.username());
        user.setFirstName(userUpdateRequestDto.firstName());
        user.setLastName(userUpdateRequestDto.lastName());
        user.setEmail(userUpdateRequestDto.email());

        return user;
    }
}
