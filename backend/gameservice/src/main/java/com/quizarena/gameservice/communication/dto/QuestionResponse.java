package com.quizarena.gameservice.communication.dto;

import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class QuestionResponse {
    String text;
    List<AnswerResponse> answers;
    Integer currentIndex;
    Integer totalQuestions;
    Integer timeLimitSeconds;
    Long startedAt;

    public static QuestionResponse from(final Question question, final Integer currentIndex, final Integer totalQuestions, final Integer timeLimitSeconds, final Long startedAt) {
        return QuestionResponse.builder()
                .text(question.getText())
                .answers(question.getAnswers().stream().map(AnswerResponse::from).toList())
                .currentIndex(currentIndex)
                .totalQuestions(totalQuestions)
                .timeLimitSeconds(timeLimitSeconds)
                .startedAt(startedAt)
                .build();
    }
}
