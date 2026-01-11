package com.quizarena.quiz.feature.quiz.dto;

import com.quizarena.quiz.feature.quiz.model.QuizCategory;
import com.quizarena.quiz.feature.quiz.user.dto.UserResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class QuizListResponseDto {
    private UUID id;
    private String title;
    private QuizCategory category;
    private UserResponseDto author;
    private int questionCount;
}


