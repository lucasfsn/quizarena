package com.quizarena.gameservice.game.model;

import com.quizarena.gameservice.communication.dto.Question;
import com.quizarena.gameservice.communication.dto.Quiz;
import com.quizarena.gameservice.game.enums.GameState;
import com.quizarena.gameservice.player.model.Player;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Game implements Serializable {
    private final UUID id = UUID.randomUUID();
    private String roomCode;
    private GameState state;
    private final List<Player> players = new ArrayList<>();
    private Quiz quiz;
    private int round = 0;
    private long startGameTime;
    private int displayQuestionTimeInSeconds = 20;
    private int answerTimeInSeconds = 20;

    public Game(String roomCode, Quiz quiz) {
        this(roomCode, quiz, 10, 30);
    }

    public Game(String roomCode, Quiz quiz, int displayQuestionTimeInSeconds, int answerTimeInSecond) {
        this.roomCode = roomCode;
        this.quiz = quiz;
        this.displayQuestionTimeInSeconds = displayQuestionTimeInSeconds;
        this.answerTimeInSeconds = answerTimeInSecond;
        this.state = GameState.LOBBY;
    }

    public void addPlayer(Player player) {
        if (state == GameState.LOBBY) {
            players.add(player);
        }
    }

    public void removePlayer(Player player) {
        players.remove(player);
    }

    public void incrementRound() {
        round++;
    }

    public int quizSize() {
        return quiz.getQuestions().size();
    }

    public Question currentQuestion() {
        return quiz.getQuestions().get(round);
    }
}
