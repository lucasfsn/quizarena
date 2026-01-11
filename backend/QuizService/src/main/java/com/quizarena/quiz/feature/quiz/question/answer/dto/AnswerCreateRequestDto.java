package com.quizarena.quiz.feature.quiz.question.answer.dto;

import jakarta.validation.constraints.NotBlank;

public record AnswerCreateRequestDto(
        @NotBlank String text,
        Boolean isCorrect
) {
}
