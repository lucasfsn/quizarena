package com.quizarena.gameservice.quizsession.dto;

import lombok.Value;

import java.util.UUID;

@Value
public class LeaveRequest {
        String roomCode;
        UUID userId;
}
