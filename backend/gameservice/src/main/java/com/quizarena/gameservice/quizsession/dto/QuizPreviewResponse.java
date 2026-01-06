package com.quizarena.gameservice.quizsession.dto;

import com.quizarena.gameservice.communication.dto.Quiz;
import lombok.Builder;
import lombok.Value;

import java.util.UUID;

@Value
@Builder
public class QuizPreviewResponse {
    UUID id;
    String title;
    String category;
    String author;
    Integer questionCount;

    public static QuizPreviewResponse from(final Quiz quizResponse) {
        return QuizPreviewResponse.builder()
                .id(quizResponse.getId())
                .title(quizResponse.getTitle())
                .category(quizResponse.getCategory())
                .author(quizResponse.getAuthor())
                .questionCount(quizResponse.getQuestionCount())
                .build();
    }
}
