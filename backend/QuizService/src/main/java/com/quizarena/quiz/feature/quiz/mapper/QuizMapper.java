package com.quizarena.quiz.feature.quiz.mapper;

import com.quizarena.quiz.feature.quiz.dto.QuizListResponseDto;
import com.quizarena.quiz.feature.quiz.dto.QuizResponseDto;
import com.quizarena.quiz.feature.quiz.model.Quiz;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface QuizMapper {
    @Mapping(target = "questionCount", expression = "java(quiz.getQuestions() == null ? 0 : quiz.getQuestions().size())")
    @Mapping(target = "author", source = "user")
    QuizListResponseDto quizToQuizListItemDto(Quiz quiz);

    @Mapping(target = "questionCount", expression = "java(quiz.getQuestions() == null ? 0 : quiz.getQuestions().size())")
    @Mapping(target = "author", source = "user")
    QuizResponseDto quizToQuizResponseDto(Quiz quiz);
}
