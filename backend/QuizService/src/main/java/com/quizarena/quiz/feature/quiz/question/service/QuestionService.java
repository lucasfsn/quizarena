package com.quizarena.quiz.feature.quiz.question.service;

import com.quizarena.quiz.feature.quiz.model.Quiz;
import com.quizarena.quiz.feature.quiz.question.dto.QuestionCreateRequestDto;
import com.quizarena.quiz.feature.quiz.question.model.Question;

import java.util.List;

public interface QuestionService {

    List<Question> createQuestionsForQuiz(List<QuestionCreateRequestDto> dtos, Quiz quiz);
}
