package com.quizarena.quiz.shared.dto;


import com.quizarena.quiz.core.handler.dto.FieldValidationErrorsDto;
import com.quizarena.quiz.shared.enums.SuccessCode;
import jakarta.annotation.Nullable;

import java.time.LocalDateTime;
import java.util.List;

public record ResponseDto<T>(
        SuccessCode code,
        String message,
        LocalDateTime timestamp,
        @Nullable List<FieldValidationErrorsDto> errors,
        T data) {
    public ResponseDto(
            SuccessCode code, String message, List<FieldValidationErrorsDto> errors, T data) {
        this(code, message, LocalDateTime.now(), errors, data);
    }

    public ResponseDto(SuccessCode code, String message, T data) {
        this(code, message, LocalDateTime.now(), null, data);
    }
}
