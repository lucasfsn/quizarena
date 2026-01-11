package com.quizarena.gameservice.communication.dto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class AnswerResponse {
    String text;

    public static AnswerResponse from(final Answer answer) {
        return AnswerResponse.builder()
                .text(answer.getText())
                .build();
    }
}
