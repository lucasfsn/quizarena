package com.quizarena.gameservice.quizsession.dto;

import com.quizarena.gameservice.player.model.Player;
import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class GameResultResponse {
    List<GameResultPlayerResponse> gameResultPlayerResponseList;

    public static GameResultResponse from(final List<Player> players) {
        return GameResultResponse.builder()
                .gameResultPlayerResponseList(players.stream().map(GameResultPlayerResponse::from).toList())
                .build();
    }
}
