package com.usermanagement.feature.user.dto;

public record PlayerGameResultResponse(
        PlayerResponse player,
        Integer score,
        Integer correctAnswers
) {}
