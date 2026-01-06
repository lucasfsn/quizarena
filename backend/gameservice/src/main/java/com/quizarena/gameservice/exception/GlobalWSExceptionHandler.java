package com.quizarena.gameservice.exception;

import com.quizarena.gameservice.exception.dto.ErrorResponseBuilder;
import com.quizarena.gameservice.exception.dto.ErrorResponseDto;
import com.quizarena.gameservice.quizsession.service.GameNotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.security.Principal;

@ControllerAdvice
@Slf4j
@RequiredArgsConstructor
public class GlobalWSExceptionHandler {

    private final GameNotificationService gameNotificationService;

    @MessageExceptionHandler({BusinessException.class})
    public void handleBusinessException(BusinessException exception, Principal principal) {
        logError(exception);
        ErrorResponseDto errorDto = ErrorResponseBuilder.build(
                exception.getCode(),
                exception.getMessage(),
                exception.getErrors()
        );
        gameNotificationService.notifyUserError(principal.getName(), errorDto);
    }

    @MessageExceptionHandler({IllegalStateException.class})
    public void handleIllegalStateException(IllegalStateException exception, Principal principal) {
        logError(exception);
        ErrorResponseDto errorDto = ErrorResponseBuilder.build(
                ErrorCode.INVALID_STATE.getName(),
                exception.getMessage()
        );
        gameNotificationService.notifyUserError(principal.getName(), errorDto);
    }

    @MessageExceptionHandler({EntityNotFoundException.class})
    public void handleNotFoundException(EntityNotFoundException exception, Principal principal) {
        logError(exception);
        ErrorResponseDto errorDto = ErrorResponseBuilder.build(
                ErrorCode.NOT_FOUND.getName(),
                exception.getMessage()
        );
        gameNotificationService.notifyUserError(principal.getName(), errorDto);
    }

    @MessageExceptionHandler({Exception.class})
    public void handleAllExceptions(Exception exception, Principal principal) {
        log.error("Unhandled WebSocket Exception for user {}: {}", principal.getName(), exception.getMessage(), exception);
        ErrorResponseDto errorDto = ErrorResponseBuilder.build(
                "INTERNAL_ERROR",
                "An unexpected error occurred during game session"
        );
        gameNotificationService.notifyUserError(principal.getName(), errorDto);
    }

    private void logError(Exception ex) {
        if (log.isErrorEnabled()) {
            log.error("WebSocket Error: {}", ex.getMessage());
        }
    }
}