package com.quizarena.gameservice.game.dto;

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
