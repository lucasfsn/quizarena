package com.quizarena.quiz.feature.quiz.question.answer.dto;

public record AnswerResponseDto(
        String text,
        Boolean isCorrect
) {
}
