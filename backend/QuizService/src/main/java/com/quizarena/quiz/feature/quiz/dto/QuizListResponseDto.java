package com.quizarena.quiz.feature.quiz.dto;

import com.quizarena.quiz.feature.quiz.model.QuizCategory;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class QuizListResponseDto {
    private UUID id;
    private String title;
    private QuizCategory category;
    private UUID authorId;
    private int questionCount;
}


