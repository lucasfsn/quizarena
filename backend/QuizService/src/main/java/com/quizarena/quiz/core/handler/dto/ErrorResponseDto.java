package com.quizarena.quiz.core.handler.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ErrorResponseDto {
    private String code;
    private String message;
    private LocalDateTime timestamp;
    private List<FieldValidationErrorsDto> errors;
    @Builder.Default private Object data = null;
}
