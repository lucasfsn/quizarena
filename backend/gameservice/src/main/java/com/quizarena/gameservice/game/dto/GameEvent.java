package com.quizarena.gameservice.quizsession.dto;


import com.quizarena.gameservice.quizsession.enums.GameEventType;
import lombok.AllArgsConstructor;
import lombok.Value;

@Value
@AllArgsConstructor
public class GameEvent {
    GameEventType eventType;
    Object payload;
}
