package com.quizarena.gameservice.communication.service;

import com.quizarena.gameservice.communication.dto.Answer;
import com.quizarena.gameservice.communication.dto.Question;
import com.quizarena.gameservice.communication.dto.Quiz;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class QuizServiceClient {

    @Value("${services.quizservice.url}")
    private String quizServiceUrl;

    public final Quiz getQuiz(final UUID quizId) {
        Answer answer = new Answer("a", true);
        Answer answer2 = new Answer("b", false);
        Answer answer3= new Answer("c", false);
        Answer answer4 = new Answer("d", false);
        Question question = new Question("Co bylo?", List.of(answer, answer2, answer3, answer4));
        Question question2 = new Question("Co bylo2?", List.of(answer, answer2, answer3, answer4));
        return new Quiz(quizId, "title", "category", "author", 2, List.of(question, question2));
    }
}
