package com.quizarena.gameservice.game.service;

import com.quizarena.gameservice.communication.dto.Question;
import com.quizarena.gameservice.communication.dto.QuestionResponse;
import com.quizarena.gameservice.communication.dto.Quiz;
import com.quizarena.gameservice.communication.service.QuizServiceClient;
import com.quizarena.gameservice.exception.EntityNotFoundException;
import com.quizarena.gameservice.game.dto.CorrectAnswer;
import com.quizarena.gameservice.game.dto.CreateGameRequest;
import com.quizarena.gameservice.game.dto.GameDetailsResponse;
import com.quizarena.gameservice.game.dto.GameResultResponse;
import com.quizarena.gameservice.game.enums.GameEventType;
import com.quizarena.gameservice.game.enums.GameState;
import com.quizarena.gameservice.game.model.Game;
import com.quizarena.gameservice.game.repository.GameRepository;
import com.quizarena.gameservice.game.util.UserSessionService;
import com.quizarena.gameservice.player.model.Player;
import com.quizarena.gameservice.player.enums.PlayerRole;
import com.quizarena.gameservice.player.service.PlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GameService {

    private static final int DISPLAY_QUESTION_SECONDS = 3;
    private final PlayerService playerService;
    private final GameNotificationService gameNotificationService;
    private final GameValidationService gameValidationService;
    private final GameRepository gameRepository;
    private final QuizServiceClient quizServiceClient;
    private final ThreadPoolTaskScheduler taskScheduler;

    public Game createGame(final CreateGameRequest request, final Jwt jwt) {
        Quiz quiz = quizServiceClient.getQuiz(request.getQuizId());
        String roomCode = gameRepository.generateUniqueAccessCode();
        Game game = new Game(roomCode, quiz);
        Player admin = playerService.createPlayer(
                UserSessionService.getLoggedInUserId(jwt),
                PlayerRole.ADMIN,
                UserSessionService.getLoggedInUserFirstName(jwt),
                UserSessionService.getLoggedInUserLastName(jwt));
        game.addPlayer(admin);

        gameRepository.saveGameWithRoomCodeMapping(game);
        return game;
    }

    public Game getGame(final UUID uuid, final Jwt jwt) {
       Game game = gameRepository.getGame(uuid);
       gameValidationService.validateUserInGame(game, UserSessionService.getLoggedInUserId(jwt));
       return game;
    }

    public Game getGameByRoomCode(final String roomCode, final Jwt jwt) {
        Game game = gameRepository.getGameByRoomCode(roomCode);
        gameValidationService.validateUserInGame(game, UserSessionService.getLoggedInUserId(jwt));
        return game;
    }

    public void deleteGame(UUID uuid) {
        Game game = gameRepository.getGame(uuid);
        gameRepository.deleteGame(game);
    }

    public Game addPlayerToGame(String roomCode, Jwt jwt) {
        UUID userId = UserSessionService.getLoggedInUserId(jwt);
        Game game = gameRepository.getGameByRoomCode(roomCode);
        if (game.getState() != GameState.LOBBY) {
            throw new IllegalStateException("Game is not in lobby");
        }
        boolean isAlreadyInGame = game.getPlayers().stream()
                .anyMatch(player -> player.getUserId().equals(userId));
        if (isAlreadyInGame) {
            throw new IllegalStateException("User is already a participant of this game");
        }
        Player player = playerService.createPlayer(userId, PlayerRole.ADMIN,
                UserSessionService.getLoggedInUserFirstName(jwt),
                UserSessionService.getLoggedInUserLastName(jwt));
        game.addPlayer(player);
        gameRepository.saveGame(game);
        gameNotificationService.notifyGame(roomCode, GameEventType.LOBBY_UPDATE, GameDetailsResponse.from(game));
        return game;
    }

    public Game removePlayerFromGame(String roomCode, UUID userId) {
        Game game = gameRepository.getGameByRoomCode(roomCode);
        if (game.getState() != GameState.LOBBY) {
            throw new IllegalStateException("Game is not in lobby");
        }
        Optional<Player> playerToRemove = game.getPlayers().stream().filter(p -> p.getId().equals(userId)).findFirst();
        if (playerToRemove.isPresent()) {
            Player player = playerToRemove.get();
            if (player.getRole() == PlayerRole.ADMIN) {
                gameNotificationService.notifyGame(roomCode, GameEventType.LOBBY_CLOSE);
                deleteGame(game.getId());
            } else {
                game.removePlayer(playerToRemove.get());
                gameRepository.saveGame(game);
                gameNotificationService.notifyGame(roomCode, GameEventType.LOBBY_UPDATE, GameDetailsResponse.from(game));
            }
        } else throw new EntityNotFoundException("Player not found");
        return game;
    }

    public Game startGame(String roomCode) {
        Game game = gameRepository.getGameByRoomCode(roomCode);
        game.setState(GameState.QUIZ);
        game.setStartGameTime(System.currentTimeMillis());
        gameRepository.saveGame(game);
        startGameLoop(game.getId(), roomCode);
        return game;
    }

    public void processPlayerAnswer(String roomCode, UUID userId, Integer answerId) {
        Game game = gameRepository.getGameByRoomCode(roomCode);
        if (game.getState() != GameState.QUIZ) {
            throw new IllegalStateException("Game is not in quiz");
        }
        long now = System.currentTimeMillis();
        long timeElapsed = now - game.getStartGameTime();
        if (timeElapsed > (game.getAnswerTimeInSeconds() * 1000L)) {
            throw new IllegalStateException("Answer time exceeded");
        }
        Player player = game.getPlayers().stream()
                .filter(p -> p.getUserId().equals(userId))
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("Player not found"));
        if (player.isAlreadyAnswered()) {
            throw new IllegalStateException("Player already answered");
        }
        Question currentQuestion = game.currentQuestion();
        if (currentQuestion.correctAnswerIndex() == answerId) {
            int points = calculatePoints(timeElapsed, game.getAnswerTimeInSeconds());
            player.addToScore(points);
            player.incrementCorrectAnswers();
        }
        player.setAlreadyAnswered(true);
        gameRepository.saveGame(game);
    }

    private int calculatePoints(long timeElapsed, int answerTimeLimit) {
        int maxPoints = 1000;
        double ratio = (double) timeElapsed / (answerTimeLimit * 1000.0);
        return (int) (maxPoints * (1.0 - (ratio * 0.5)));
    }

    private void startGameLoop(UUID gameId, String roomCode) {
        processQuestionStep(gameId, roomCode);
    }

    private void processQuestionStep(UUID gameId, String roomCode) {
        Game game = gameRepository.getGame(gameId);
        if (game.getRound() >= game.quizSize()) {
            finishGame(gameId, roomCode);
            return;
        }
        game.getPlayers().forEach(player -> player.setAlreadyAnswered(false));
        game.setStartGameTime(System.currentTimeMillis());
        gameRepository.saveGame(game);
        gameNotificationService.notifyGame(
                roomCode,
                GameEventType.QUESTION,
                QuestionResponse.from(game.currentQuestion(), game.getStartGameTime()));
        taskScheduler.schedule(() -> handleEndOfQuestion(gameId, roomCode),
                Instant.now().plusSeconds(game.getAnswerTimeInSeconds()));
    }

    private void handleEndOfQuestion(UUID gameId, String roomCode) {
        Game game = gameRepository.getGame(gameId);
        gameNotificationService.notifyGame(
                roomCode,
                GameEventType.CORRECT_ANSWER,
                CorrectAnswer.from(game));
        taskScheduler.schedule(() -> {
            Game nextRoundGame = gameRepository.getGame(gameId);
            nextRoundGame.incrementRound();
            gameRepository.saveGame(game);
            processQuestionStep(gameId, roomCode);
        }, Instant.now().plusSeconds(DISPLAY_QUESTION_SECONDS));
    }
    private void finishGame(UUID gameId, String roomCode) {
        Game game = gameRepository.getGame(gameId);
        game.setState(GameState.SHOWING_RESULTS);
        gameRepository.saveGame(game);
        gameNotificationService.notifyGame(roomCode, GameEventType.GAME_FINISHED, GameResultResponse.from(game.getPlayers()));
    }
}