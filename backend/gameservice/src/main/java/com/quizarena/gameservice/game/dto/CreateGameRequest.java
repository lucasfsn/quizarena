package com.quizarena.gameservice.quizsession.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Value;

import java.util.UUID;

@Value
public class CreateGameRequest {
    @NotNull
    UUID quizId;
    Integer displayQuestionTimeInSeconds;
    Integer answerTimeInSeconds;
}
