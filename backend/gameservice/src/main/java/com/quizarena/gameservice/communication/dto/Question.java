package com.quizarena.gameservice.communication.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.stream.IntStream;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Question {
    private String text;
    private List<Answer> answers;

    public int correctAnswerIndex() {
        return IntStream.range(0, answers.size())
                .filter(i -> answers.get(i).isCorrect())
                .findFirst()
                .orElse(-1);
    }
}
