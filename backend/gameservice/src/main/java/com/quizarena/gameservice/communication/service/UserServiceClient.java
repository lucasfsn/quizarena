package com.quizarena.gameservice.communication.service;

import com.quizarena.gameservice.game.dto.GameResultPlayerResponse;
import com.quizarena.gameservice.game.dto.GameResultResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceClient {
    private final RestTemplate restTemplate;

    @Value("${services.userservice.url}")
    private String userServiceUrl;

    public void sendGameResults(GameResultResponse results) {
        String url = userServiceUrl + "/stats";
        try {
            HttpEntity<List<GameResultPlayerResponse>> request = new HttpEntity<>(results.getGameResultPlayerResponseList());
            restTemplate.exchange(url, HttpMethod.POST, request, Void.class);
        } catch (HttpClientErrorException ignored) {
        }
    }
}