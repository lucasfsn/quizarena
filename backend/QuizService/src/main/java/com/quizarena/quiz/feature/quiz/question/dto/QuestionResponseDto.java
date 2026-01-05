package com.quizarena.quiz.feature.quiz.question.dto;

import com.quizarena.quiz.feature.quiz.question.answer.dto.AnswerResponseDto;

import java.util.List;

public record QuestionResponseDto(
        String text,
        List<AnswerResponseDto> answers
) {
}
