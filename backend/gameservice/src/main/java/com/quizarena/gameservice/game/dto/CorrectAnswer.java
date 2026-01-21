package com.quizarena.gameservice.game.dto;

import com.quizarena.gameservice.game.model.Game;
import com.quizarena.gameservice.player.dto.PlayerScoreResponse;
import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class CorrectAnswer {
    List<Integer> correctAnswerIds;
    List<PlayerScoreResponse> players;

    public static CorrectAnswer from(Game game) {
        return CorrectAnswer.builder()
                .correctAnswerIds(game.currentQuestion().correctAnswerIndices())
                .players(game.getPlayers().stream().map(PlayerScoreResponse::from).toList())
                .build();
    }
}
