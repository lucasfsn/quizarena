package com.quizarena.gameservice.quizsession.controller.ws;

import com.quizarena.gameservice.quizsession.dto.AnswerRequest;
import com.quizarena.gameservice.quizsession.dto.LeaveRequest;
import com.quizarena.gameservice.quizsession.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class GameWSController {
    private final GameService gameService;

    @MessageMapping("/game/start")
    public void startGame(@Payload final String roomCode) {
        gameService.startGame(roomCode);
    }

    @MessageMapping("/game/leave")
    public void leaveGame(@Payload final LeaveRequest request) {
        gameService.removePlayerFromGame(request.getRoomCode(), request.getUserId());
    }
    @MessageMapping("/game/answer")
    public void receiveAnswer(@Payload final AnswerRequest request) {
        gameService.processPlayerAnswer(request.getRoomCode(), request.getUserId(), request.getAnswerId());

    }
}