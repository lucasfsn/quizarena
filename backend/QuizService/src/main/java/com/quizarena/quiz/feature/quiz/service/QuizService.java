package com.quizarena.quiz.feature.quiz.service;

import com.quizarena.quiz.feature.quiz.dto.QuizCreateRequestDto;
import com.quizarena.quiz.feature.quiz.dto.QuizListResponseDto;
import com.quizarena.quiz.feature.quiz.dto.QuizResponseDto;
import com.quizarena.quiz.feature.quiz.model.QuizCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.UUID;


public interface QuizService {
    QuizResponseDto createQuiz(Jwt jwt, QuizCreateRequestDto quizCreateRequestDto);

    Page<QuizListResponseDto> getAllQuizzes(QuizCategory category, String title, String author, Pageable pageable);

    QuizResponseDto getQuizById(UUID quizId);
}
