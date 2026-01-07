package com.quizarena.gameservice.quizsession.dto;

import com.quizarena.gameservice.player.dto.PlayerScoreResponse;
import com.quizarena.gameservice.quizsession.model.Game;
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
