package com.usermanagement.feature.user.service.impl;

import com.usermanagement.core.handler.BusinessException;
import com.usermanagement.core.handler.enums.BusinessExceptionReason;
import com.usermanagement.feature.user.dto.PlayerGameResultResponse;
import com.usermanagement.feature.user.dto.UserUpdateRequestDto;
import com.usermanagement.feature.user.model.User;
import com.usermanagement.feature.user.repository.UserRepository;
import com.usermanagement.feature.user.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public Optional<User> getLocalUser(UUID id) {
        return userRepository.findById(id);
    }

    @Override
    @Transactional
    public User createFromToken(Jwt jwt) {
        User user = new User();
        user.setId(UUID.fromString(jwt.getSubject()));
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

        User user = userRepository.findById(UUID.fromString(jwt.getSubject())).orElseThrow(
                () -> new BusinessException(BusinessExceptionReason.USER_NOT_FOUND)
        );

        //TODO: Refactor
        if (dto.username() != null) user.setUserName(dto.username());
        if (dto.firstName() != null) user.setFirstName(dto.firstName());
        if (dto.lastName() != null) user.setLastName(dto.lastName());
        if (dto.email() != null) user.setEmail(dto.email());

        return userRepository.save(user);
    }

    @Override
    @Transactional
    public void updateUserStatistics(List<PlayerGameResultResponse> playerGameResultResponseList) {

        List<UUID> playerIds = playerGameResultResponseList.stream()
                .map(p -> p.player().getId())
                .toList();

        List<User> users = userRepository.findAllById(playerIds);

        Map<UUID, User> userMap = users.stream()
                .collect(Collectors.toMap(User::getId, Function.identity()));

        for (PlayerGameResultResponse player : playerGameResultResponseList) {
            UUID playerId = player.player().getId();
            User user = userMap.get(playerId);

            if (user == null) {
                throw new BusinessException(BusinessExceptionReason.USER_NOT_FOUND);
            }

            user.setScore(user.getScore() + player.score());
            user.setCorrectAnswersTotal(user.getCorrectAnswersTotal() + player.correctAnswers().longValue());

        }

        userRepository.saveAll(users);
    }
}
