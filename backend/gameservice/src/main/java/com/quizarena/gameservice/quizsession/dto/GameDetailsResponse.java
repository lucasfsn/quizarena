package com.quizarena.gameservice.quizsession.dto;

import com.quizarena.gameservice.player.dto.PlayerResponse;
import com.quizarena.gameservice.quizsession.model.Game;
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

    public static GameDetailsResponse from(final Game game) {
        return GameDetailsResponse.builder()
                .id(game.getId())
                .roomCode(game.getRoomCode())
                .players(game.getPlayers().stream().map(PlayerResponse::from).toList())
                .quiz(QuizPreviewResponse.from(game.getQuiz()))
                .build();
    }
}
