package com.quizarena.gameservice.communication.service;

import com.quizarena.gameservice.communication.dto.UserResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserServiceClient {

    @Value("${services.userservice.url}")
    private String userServiceUrl;

    public final UserResponse getUser(final UUID id) {
        return new UserResponse(id, "Test", "Testowy");
    }
}
