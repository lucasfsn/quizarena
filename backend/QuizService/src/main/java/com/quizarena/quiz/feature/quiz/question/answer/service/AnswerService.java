package com.quizarena.quiz.feature.quiz.question.answer.service;

import com.quizarena.quiz.feature.quiz.question.answer.dto.AnswerCreateRequestDto;
import com.quizarena.quiz.feature.quiz.question.answer.model.Answer;

import java.util.List;

public interface AnswerService {
    List<Answer> createAnswersForQuestion(List<AnswerCreateRequestDto> dtos);
}
