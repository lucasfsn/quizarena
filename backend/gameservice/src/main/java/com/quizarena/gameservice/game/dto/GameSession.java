package com.quizarena.gameservice.game.dto;

import com.quizarena.gameservice.communication.dto.QuestionResponse;
import com.quizarena.gameservice.game.enums.GameState;
import com.quizarena.gameservice.game.model.Game;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class GameSession {
    GameDetailsResponse gameDetailsResponse;
    GameState gameStatus;
    QuestionResponse currentQuestion;
    Integer correctAnswerId;

    public static GameSession from(Game game) {
        return GameSession.builder()
                .gameDetailsResponse(GameDetailsResponse.from(game))
                .gameStatus(game.getState())
                .currentQuestion(QuestionResponse.from(game.currentQuestion(), game.getStartGameTime()))
                .correctAnswerId(game.currentQuestion().correctAnswerIndex())
                .build();
    }
}
