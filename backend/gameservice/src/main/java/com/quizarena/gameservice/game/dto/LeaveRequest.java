package com.quizarena.gameservice.game.dto;

import lombok.Value;

import java.util.UUID;

@Value
public class LeaveRequest {
        String roomCode;
        UUID userId;
}
