package com.quizarena.gameservice.communication.dto;

import lombok.Value;

import java.util.UUID;

@Value
public class UserResponse {
    UUID id;
    String firstName;
    String lastName;
}
