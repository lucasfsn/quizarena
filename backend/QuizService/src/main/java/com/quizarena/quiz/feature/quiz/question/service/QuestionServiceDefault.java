package com.quizarena.quiz.feature.quiz.question.service;

import com.quizarena.quiz.feature.quiz.model.Quiz;
import com.quizarena.quiz.feature.quiz.question.answer.service.AnswerService;
import com.quizarena.quiz.feature.quiz.question.dto.QuestionCreateRequestDto;
import com.quizarena.quiz.feature.quiz.question.model.Question;
import com.quizarena.quiz.feature.quiz.question.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionServiceDefault implements QuestionService {
    private final AnswerService answerService;
    @Override
    @Transactional
    public List<Question> createQuestionsForQuiz(List<QuestionCreateRequestDto> dtos, Quiz quiz) {
        return dtos.stream().map(dto -> Question.builder()
                .text(dto.text())
                .answers(answerService.createAnswersForQuestion(dto.answers()))
                .quiz(quiz)
                .build()).toList();
    }
}
