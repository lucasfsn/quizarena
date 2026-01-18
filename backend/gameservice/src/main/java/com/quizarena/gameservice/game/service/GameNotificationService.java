package com.quizarena.gameservice.game.service;

import com.quizarena.gameservice.exception.dto.ErrorResponseDto;
import com.quizarena.gameservice.game.dto.GameEvent;
import com.quizarena.gameservice.game.enums.GameEventType;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GameNotificationService {
    private final SimpMessagingTemplate messagingTemplate;

    public void notifyGame(final String roomCode, final GameEventType type) {
        notifyGame(roomCode, type, null);
    }

    public void notifyGame(final String roomCode, final GameEventType type, final Object payload) {
        String destination = "/topic/game/" + roomCode;
        messagingTemplate.convertAndSend(destination, new GameEvent(type, payload));
    }

    public void notifyUserError(final String username, final ErrorResponseDto error) {
        messagingTemplate.convertAndSendToUser(username, "/queue/errors", error);
    }
}
