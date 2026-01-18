package com.quizarena.gameservice.game.controller.rest;

import com.quizarena.gameservice.game.dto.*;
import com.quizarena.gameservice.game.enums.SuccessCode;
import com.quizarena.gameservice.game.model.Game;
import com.quizarena.gameservice.game.service.GameService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.UUID;

@RestController
@RequestMapping("/games")
@RequiredArgsConstructor
public class GameController {
    private final GameService gameService;

    @PostMapping
    public ResponseEntity<ResponseDto<GameDetailsResponse>> createGame(
            @AuthenticationPrincipal Jwt jwt,
            @RequestBody @Valid final CreateGameRequest request) {
        Game game = gameService.createGame(request, jwt);
        GameDetailsResponse data = GameDetailsResponse.from(game);

        return ResponseEntity
                .created(URI.create("/games/" + game.getId()))
                .body(new ResponseDto<>(SuccessCode.RESOURCE_CREATED, "Game created successfully", data));
    }

    @GetMapping("/{roomCode}")
    public ResponseEntity<ResponseDto<GameSession>> getGameSession(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable final String roomCode) {
        Game game = gameService.getGameByRoomCode(roomCode, jwt);
        GameSession data = GameSession.from(game);

        return ResponseEntity.ok(new ResponseDto<>(SuccessCode.RESPONSE_SUCCESSFUL, "Game session retrieved", data));
    }

    @GetMapping("/{id}/results")
    public ResponseEntity<ResponseDto<GameResultResponse>> getGameResults(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable final UUID id) {
        Game game = gameService.getGame(id, jwt);
        GameResultResponse data = GameResultResponse.from(game.getPlayers());

        return ResponseEntity.ok(new ResponseDto<>(SuccessCode.RESPONSE_SUCCESSFUL, "Game results retrieved", data));
    }

    @PostMapping("/join")
    public ResponseEntity<ResponseDto<GameDetailsResponse>> joinGame(
            @AuthenticationPrincipal Jwt jwt,
            @RequestParam final String roomCode) {
        Game game = gameService.addPlayerToGame(roomCode, jwt);
        GameDetailsResponse data = GameDetailsResponse.from(game);

        return ResponseEntity
                .created(URI.create("/games/" + game.getId()))
                .body(new ResponseDto<>(SuccessCode.RESOURCE_UPDATED, "Joined the game successfully", data));
    }
}