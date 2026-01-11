package com.quizarena.gameservice.quizsession.controller.rest;

import com.quizarena.gameservice.quizsession.dto.CreateGameRequest;
import com.quizarena.gameservice.quizsession.dto.GameDetailsResponse;
import com.quizarena.gameservice.quizsession.dto.GameResultResponse;
import com.quizarena.gameservice.quizsession.dto.GameSession;
import com.quizarena.gameservice.quizsession.model.Game;
import com.quizarena.gameservice.quizsession.service.GameService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.UUID;

@RestController
@RequestMapping("/games")
@RequiredArgsConstructor
public class GameController {
    private final GameService gameService;

    @PostMapping
    public ResponseEntity<GameDetailsResponse> createGame(@RequestBody @Valid final CreateGameRequest request, @RequestParam final UUID userId) {
        Game game = gameService.createGame(request, userId);
        return ResponseEntity.created(URI.create("/games/" + game.getId())).body(GameDetailsResponse.from(game));
    }

    @GetMapping("/{roomCode}")
    public ResponseEntity<GameSession> getGameSession(@PathVariable final String roomCode) {
        Game game = gameService.getGameByRoomCode(roomCode);
        return ResponseEntity.ok(GameSession.from(game));
    }

    @GetMapping("/{id}/results")
    public ResponseEntity<GameResultResponse> getGameResults(@PathVariable final UUID id) {
        Game game = gameService.getGame(id);
        return ResponseEntity.ok(GameResultResponse.from(game.getPlayers()));
    }

    @PostMapping("/join")
    public ResponseEntity<GameDetailsResponse> joinGame(@RequestParam final String roomCode, @RequestParam final UUID userId) {
        Game game = gameService.addPlayerToGame(roomCode, userId);
        return ResponseEntity.created(URI.create("/games/" + game.getId()))
                .body(GameDetailsResponse.from(game));
    }
}
