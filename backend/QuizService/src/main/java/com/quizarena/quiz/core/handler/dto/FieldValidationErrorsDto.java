package com.quizarena.quiz.core.handler.dto;

import com.quizarena.quiz.core.handler.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FieldValidationErrorsDto {
    private ErrorCode errorCode;
    private String field;
    private String message;
}

