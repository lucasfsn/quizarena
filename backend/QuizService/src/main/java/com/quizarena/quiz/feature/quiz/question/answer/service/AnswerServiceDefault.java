package com.quizarena.quiz.feature.quiz.question.answer.service;

import com.quizarena.quiz.feature.quiz.question.answer.dto.AnswerCreateRequestDto;
import com.quizarena.quiz.feature.quiz.question.answer.model.Answer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnswerServiceDefault implements AnswerService {

    @Override
    public List<Answer> createAnswersForQuestion(List<AnswerCreateRequestDto> dtos) {
        return dtos.stream().map(dto -> Answer.builder()
                .text(dto.text())
                .isCorrect(dto.isCorrect())
                .build()).toList();
    }
}
