package com.quizarena.gameservice.game.service;

import com.quizarena.gameservice.game.model.Game;
import com.quizarena.gameservice.game.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GameValidationService {
    private final GameRepository gameRepository;

    public void validateUserInGame(final String roomCode, final UUID userId) {
        Game game = gameRepository.getGameByRoomCode(roomCode);
        validateUserInGame(game, userId);
    }

    public void validateUserInGame(final Game game, final UUID userId) {
        boolean isParticipant = game.getPlayers().stream()
                .anyMatch(p -> p.getUserId().equals(userId));
        if (!isParticipant) {
            throw new AccessDeniedException("User " + userId + " is not a participant of game " + game.getRoomCode());
        }
    }
}
