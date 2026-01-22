package com.quizarena.gameservice.player.service;

import com.quizarena.gameservice.player.enums.PlayerRole;
import com.quizarena.gameservice.player.model.Player;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class PlayerService {

	public Player createPlayer(
		UUID userId,
		PlayerRole role,
		String firstName,
		String lastName
	) {
		return new Player(userId, role, firstName, lastName);
	}
}
