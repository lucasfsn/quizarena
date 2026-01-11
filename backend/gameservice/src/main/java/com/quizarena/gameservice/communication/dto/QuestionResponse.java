package com.quizarena.gameservice.communication.dto;

import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class QuestionResponse {
    String text;
    List<AnswerResponse> answers;
    Long startedAt;

    public static QuestionResponse from(final Question question, Long startedAt) {
        return QuestionResponse.builder()
                .text(question.getText())
                .answers(question.getAnswers().stream().map(AnswerResponse::from).toList())
                .startedAt(startedAt)
                .build();
    }
}
