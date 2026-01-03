package com.quizarena.quiz.feature.quiz.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.quizarena.quiz.feature.quiz.model.QuizCategory;
import com.quizarena.quiz.feature.quiz.question.dto.QuestionCreateRequestDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record QuizCreateRequestDto(
        @NotBlank String title,
        @NotBlank String description,
        @NotNull @JsonProperty("category") QuizCategory category,
        @Size (max=20) @Valid List<QuestionCreateRequestDto> questions
) {
}
