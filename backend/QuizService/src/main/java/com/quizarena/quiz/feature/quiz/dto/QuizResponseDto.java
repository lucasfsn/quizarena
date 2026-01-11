package com.quizarena.quiz.feature.quiz.dto;

import com.quizarena.quiz.feature.quiz.model.QuizCategory;
import com.quizarena.quiz.feature.quiz.question.dto.QuestionResponseDto;
import com.quizarena.quiz.feature.quiz.user.dto.UserResponseDto;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class QuizResponseDto {
    private UUID id;
    private String title;
    private QuizCategory category;
    private UserResponseDto author;
    private int questionCount;
    private List<QuestionResponseDto> questions;
}