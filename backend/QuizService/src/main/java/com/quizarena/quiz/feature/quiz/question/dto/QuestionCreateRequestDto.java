package com.quizarena.quiz.feature.quiz.question.dto;

import com.quizarena.quiz.feature.quiz.question.answer.dto.AnswerCreateRequestDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public record QuestionCreateRequestDto(
        @NotBlank String text,
        @Size(min = 2, max = 4) @Valid List<AnswerCreateRequestDto> answers
) {
}
