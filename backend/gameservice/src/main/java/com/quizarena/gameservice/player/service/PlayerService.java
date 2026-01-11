package com.quizarena.gameservice.player.service;

import com.quizarena.gameservice.player.model.Player;
import com.quizarena.gameservice.player.enums.PlayerRole;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PlayerService {
    // TODO get player
    public Player createPlayer(UUID userId, PlayerRole role, String firstName, String lastName) {
        return new Player(userId, role, "Test", "Testowy");
    }
}