package com.usermanagement.feature.user.service.impl;

import com.usermanagement.core.handler.BusinessException;
import com.usermanagement.core.handler.enums.BusinessExceptionReason;
import com.usermanagement.feature.user.dto.UserUpdateRequestDto;
import com.usermanagement.feature.user.model.User;
import com.usermanagement.feature.user.repository.UserRepository;
import com.usermanagement.feature.user.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public Optional<User> getLocalUser(String id) {
        return userRepository.findById(id);
    }

    @Override
    @Transactional
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
    public Set<User> getAllUsers() {
        return new HashSet<>(userRepository.findAll());
    }

    @Override
    @Transactional
    public User updateUser(Jwt jwt, UserUpdateRequestDto dto) {

        User user = userRepository.findById(jwt.getSubject()).orElseThrow(
                () -> new BusinessException(BusinessExceptionReason.USER_NOT_FOUND)
        );

        //TODO: Refactor
        if (dto.username() != null) user.setUserName(dto.username());
        if (dto.firstName() != null) user.setFirstName(dto.firstName());
        if (dto.lastName() != null) user.setLastName(dto.lastName());
        if (dto.email() != null) user.setEmail(dto.email());

        return userRepository.save(user);
    }
}
