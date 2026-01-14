package com.quizarena.gameservice.game.dto;

import com.quizarena.gameservice.player.dto.PlayerResponse;
import com.quizarena.gameservice.player.model.Player;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class GameResultPlayerResponse {
    PlayerResponse player;
    Integer score;
    Integer correctAnswers;

    public static GameResultPlayerResponse from(final Player player) {
        return GameResultPlayerResponse.builder()
                .player(PlayerResponse.from(player))
                .score(player.getScore())
                .correctAnswers(player.getCorrectAnswers())
                .build();
    }
}
