package com.quizarena.gameservice.player.model;

import com.quizarena.gameservice.player.enums.PlayerRole;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class Player implements Serializable {
    private UUID id = UUID.randomUUID();
    private UUID userId;
    private String firstName;
    private String lastName;
    private int score = 0;
    private int correctAnswers = 0;
    private PlayerRole role;
    private boolean alreadyAnswered;

    public Player(UUID userId, PlayerRole role, String firstName, String lastName) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }

    public void addToScore(int points) {
        this.score += points;
    }
    public void incrementCorrectAnswers() {
        this.correctAnswers++;
    }
}
