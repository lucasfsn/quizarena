package com.quizarena.gameservice.game.dto;


import com.quizarena.gameservice.game.enums.GameEventType;
import lombok.AllArgsConstructor;
import lombok.Value;

@Value
@AllArgsConstructor
public class GameEvent {
    GameEventType eventType;
    Object payload;
}
