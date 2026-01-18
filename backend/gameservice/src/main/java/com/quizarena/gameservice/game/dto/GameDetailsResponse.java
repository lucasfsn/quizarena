package com.quizarena.gameservice.game.dto;

import com.quizarena.gameservice.game.model.Game;
import com.quizarena.gameservice.player.dto.PlayerResponse;
import lombok.Builder;
import lombok.Value;

import java.util.List;
import java.util.UUID;

@Value
@Builder
public class GameDetailsResponse {
    UUID id;
    String roomCode;
    QuizPreviewResponse quiz;
    List<PlayerResponse> players;
    Integer maxPlayers;

    public static GameDetailsResponse from(final Game game) {
        return GameDetailsResponse.builder()
                .id(game.getId())
                .roomCode(game.getRoomCode())
                .players(game.getPlayers().stream().map(PlayerResponse::from).toList())
                .quiz(QuizPreviewResponse.from(game.getQuiz()))
                .maxPlayers(game.getMaxPlayers())
                .build();
    }
}
