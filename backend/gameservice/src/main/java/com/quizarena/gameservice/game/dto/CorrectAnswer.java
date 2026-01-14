package com.quizarena.gameservice.game.dto;

import com.quizarena.gameservice.game.model.Game;
import com.quizarena.gameservice.player.dto.PlayerScoreResponse;
import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class CorrectAnswer {
    Integer correctAnswerId;
    List<PlayerScoreResponse> players;

    public static CorrectAnswer from(Game game) {
        return CorrectAnswer.builder()
                .correctAnswerId(game.currentQuestion().correctAnswerIndex())
                .players(game.getPlayers().stream().map(PlayerScoreResponse::from).toList())
                .build();
    }
}
