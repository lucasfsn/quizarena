package com.quizarena.gameservice.communication.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Quiz {
    private UUID id;
    private String title;
    private String category;
    private String author;
    private Integer questionCount;
    private List<Question> questions;
}
