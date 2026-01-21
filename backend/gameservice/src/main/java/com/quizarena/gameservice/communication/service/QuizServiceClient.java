package com.quizarena.gameservice.communication.service;

import com.quizarena.gameservice.communication.dto.Quiz;
import com.quizarena.gameservice.exception.EntityNotFoundException;
import com.quizarena.gameservice.game.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class QuizServiceClient {
    private final RestTemplate restTemplate;

    @Value("${services.quizservice.url}")
    private String quizServiceUrl;

    public ResponseDto<Quiz> getQuiz(final UUID quizId) {
        String url = quizServiceUrl + "/internal/" + quizId;

        try {
            return restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<ResponseDto<Quiz>>() {}
            ).getBody();

        } catch (HttpClientErrorException.NotFound e) {
            throw new EntityNotFoundException("Quiz with id " + quizId + " not found");
        }
    }
}
