package com.quizarena.gameservice.player.dto;

import com.quizarena.gameservice.player.model.Player;
import lombok.Builder;
import lombok.Value;

import java.util.UUID;

@Value
@Builder
public class PlayerScoreResponse {
    UUID userId;
    int score;
    int correctAnswers;

    public static PlayerScoreResponse from(Player player) {
        return PlayerScoreResponse.builder()
                .score(player.getScore())
                .userId(player.getUserId())
                .correctAnswers(player.getCorrectAnswers())
                .build();
    }
}
