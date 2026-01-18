package com.quizarena.gameservice.exception;

import com.quizarena.gameservice.exception.dto.ErrorResponseBuilder;
import com.quizarena.gameservice.exception.dto.ErrorResponseDto;
import com.quizarena.gameservice.game.service.GameNotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.security.Principal;
import java.util.Optional;

@ControllerAdvice
@Slf4j
@RequiredArgsConstructor
public class GlobalWSExceptionHandler {

    private final GameNotificationService gameNotificationService;

    @MessageExceptionHandler({EntityNotFoundException.class})
    public void handleNotFoundException(EntityNotFoundException exception, SimpMessageHeaderAccessor accessor) {
        logError(exception);
        sendErrorToUser(accessor, ErrorResponseBuilder.build(
                ErrorCode.NOT_FOUND.getName(),
                exception.getMessage()
        ));
    }

    @MessageExceptionHandler({IllegalStateException.class})
    public void handleIllegalStateException(IllegalStateException exception, SimpMessageHeaderAccessor accessor) {
        logError(exception);
        sendErrorToUser(accessor, ErrorResponseBuilder.build(
                ErrorCode.INVALID_STATE.getName(),
                exception.getMessage()
        ));
    }

    @MessageExceptionHandler({Exception.class})
    public void handleAllExceptions(Exception exception, SimpMessageHeaderAccessor accessor) {
        String userId = getUserId(accessor);
        log.error("Unhandled WebSocket Exception for user {}: {}", userId, exception.getMessage(), exception);

        sendErrorToUser(accessor, ErrorResponseBuilder.build(
                "INTERNAL_ERROR",
                "An unexpected error occurred during game session"
        ));
    }

    private void sendErrorToUser(SimpMessageHeaderAccessor accessor, ErrorResponseDto errorDto) {
        String userId = getUserId(accessor);
        if (!"Anonymous".equals(userId)) {
            gameNotificationService.notifyUserError(userId, errorDto);
        } else {
            log.warn("Could not notify user about error because Principal/UserId is missing");
        }
    }

    private String getUserId(SimpMessageHeaderAccessor accessor) {
        return Optional.ofNullable(accessor.getUser())
                .map(Principal::getName)
                .orElse("Anonymous");
    }

    private void logError(Exception ex) {
        log.error("WebSocket Error: {}", ex.getMessage());
    }
}