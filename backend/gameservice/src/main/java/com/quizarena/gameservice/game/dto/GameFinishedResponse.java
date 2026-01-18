package com.quizarena.gameservice.game.dto;

import lombok.Builder;
import lombok.Value;

import java.util.UUID;

@Value
@Builder
public class GameFinishedResponse {
    UUID gameId;
}
