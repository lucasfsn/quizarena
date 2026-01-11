package com.quizarena.gameservice.game.dto;

import lombok.Value;

import java.util.UUID;

@Value
public class AnswerRequest {
    String roomCode;
    UUID userId;
    Integer answerId;
}