package com.quizarena.gameservice.game.dto;

import com.quizarena.gameservice.communication.dto.QuestionResponse;
import com.quizarena.gameservice.game.enums.GameState;
import com.quizarena.gameservice.game.model.Game;
import com.quizarena.gameservice.player.enums.PlayerRole;
import lombok.Builder;
import lombok.Value;

import java.util.List;
import java.util.UUID;

@Value
@Builder
public class GameSession {
    GameDetailsResponse gameDetailsResponse;
    GameState gameStatus;
    QuestionResponse currentQuestion;
    List<Integer> correctAnswerIds;
    Integer submittedAnswerId;
    Boolean isHost;

    public static GameSession from(Game game, UUID userId) {
        return GameSession.builder()
                .gameDetailsResponse(GameDetailsResponse.from(game))
                .gameStatus(game.getState())
                .submittedAnswerId(game.getPlayer(userId).getSubmittedAnswerId())
                .isHost(game.getPlayer(userId).getRole().equals(PlayerRole.ADMIN))
                .currentQuestion(
                        game.getState() != GameState.LOBBY ? QuestionResponse.from(game.currentQuestion(), game.getRound(), game.getQuiz().getQuestionsCount(), game.getAnswerTimeInSeconds(), game.getStartGameTime()) : null)
                .correctAnswerIds(
                        game.getState() != GameState.LOBBY ? game.currentQuestion().correctAnswerIndices() : null)
                .build();
    }
}
