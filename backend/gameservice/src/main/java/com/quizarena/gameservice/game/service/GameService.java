package com.quizarena.gameservice.quizsession.service;

import com.quizarena.gameservice.communication.dto.Question;
import com.quizarena.gameservice.communication.dto.QuestionResponse;
import com.quizarena.gameservice.communication.dto.Quiz;
import com.quizarena.gameservice.communication.dto.UserResponse;
import com.quizarena.gameservice.communication.service.QuizServiceClient;
import com.quizarena.gameservice.communication.service.UserServiceClient;
import com.quizarena.gameservice.exception.EntityNotFoundException;
import com.quizarena.gameservice.player.model.Player;
import com.quizarena.gameservice.player.enums.PlayerRole;
import com.quizarena.gameservice.player.service.PlayerService;
import com.quizarena.gameservice.quizsession.dto.CorrectAnswer;
import com.quizarena.gameservice.quizsession.dto.CreateGameRequest;
import com.quizarena.gameservice.quizsession.dto.GameDetailsResponse;
import com.quizarena.gameservice.quizsession.dto.GameResultResponse;
import com.quizarena.gameservice.quizsession.enums.GameEventType;
import com.quizarena.gameservice.quizsession.enums.GameState;
import com.quizarena.gameservice.quizsession.model.Game;
import com.quizarena.gameservice.quizsession.util.AccessCodeGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class GameService {
    private static final long SESSION_TTL_SECONDS = 3600;
    private static final int DISPLAY_QUESTION_SECONDS = 3;
    private static final String GAME_PREFIX = "game:";
    private static final String ROOM_CODE_PREFIX = "roomcode:";

    private final PlayerService playerService;
    private final GameNotificationService gameNotificationService;
    private final QuizServiceClient quizServiceClient;
    private final UserServiceClient userServiceClient;
    private final ThreadPoolTaskScheduler taskScheduler;
    private final RedisTemplate<String, Object> redisTemplate;

    public Game createGame(final CreateGameRequest request, final UUID userId) {
        UserResponse userResponse = userServiceClient.getUser(userId);
        Quiz quiz = quizServiceClient.getQuiz(request.getQuizId());
        String roomCode = generateUniqueAccessCode();
        Game game = new Game(roomCode, quiz);
        Player admin = playerService.createPlayer(userId, PlayerRole.ADMIN, userResponse.getFirstName(), userResponse.getLastName());
        game.addPlayer(admin);

        saveGameWithRoomCodeMapping(game);
        return game;
    }

    public Game getGame(final UUID uuid) {
        String key = getGameKey(uuid);
        Object obj = redisTemplate.opsForValue().get(key);

        if (obj == null) {
            throw new EntityNotFoundException("Game not found");
        }
        return (Game) obj;
    }

    public Game getGameByRoomCode(final String roomCode) {
        String roomCodeKey = getRoomCodeKey(roomCode);
        Object result = redisTemplate.opsForValue().get(roomCodeKey);

        if (result == null) {
            throw new EntityNotFoundException("Game not found for access code: " + roomCode);
        }
        UUID gameId = UUID.fromString(result.toString().replace("\"", ""));
        return getGame(gameId);
    }

    public void deleteGame(UUID uuid) {
        Game game = getGame(uuid);

        String roomCodeKey = getRoomCodeKey(game.getRoomCode());
        redisTemplate.delete(roomCodeKey);

        String gameKey = getGameKey(uuid);
        redisTemplate.delete(gameKey);
    }

    public void saveGame(Game game) {
        String key = getGameKey(game.getId());
        redisTemplate.opsForValue().set(key, game, SESSION_TTL_SECONDS, TimeUnit.SECONDS);
    }

    public Game addPlayerToGame(String roomCode, UUID userId) {
        UserResponse userResponse = userServiceClient.getUser(userId);
        Game game = getGameByRoomCode(roomCode);
        if (game.getState() != GameState.LOBBY) {
            throw new IllegalStateException("Game is not in lobby");
        }
        boolean isAlreadyInGame = game.getPlayers().stream()
                .anyMatch(player -> player.getUserId().equals(userId));
        if (isAlreadyInGame) {
            throw new IllegalStateException("User is already a participant of this game");
        }
        Player player = playerService.createPlayer(userId, PlayerRole.ADMIN, userResponse.getFirstName(), userResponse.getLastName());
        game.addPlayer(player);
        saveGame(game);
        gameNotificationService.notifyGame(roomCode, GameEventType.LOBBY_UPDATE, GameDetailsResponse.from(game));
        return game;
    }

    public Game removePlayerFromGame(String roomCode, UUID userId) {
        Game game = getGameByRoomCode(roomCode);
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
                saveGame(game);
                gameNotificationService.notifyGame(roomCode, GameEventType.LOBBY_UPDATE, GameDetailsResponse.from(game));
            }
        } else throw new EntityNotFoundException("Player not found");
        return game;
    }

    public Game startGame(String roomCode) {
        Game game = getGameByRoomCode(roomCode);
        game.setState(GameState.QUIZ);
        game.setStartGameTime(System.currentTimeMillis());
        saveGame(game);
        startGameLoop(game.getId(), roomCode);
        return game;
    }

    public void processPlayerAnswer(String roomCode, UUID userId, Integer answerId) {
        Game game = getGameByRoomCode(roomCode);
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
        saveGame(game);
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
        Game game = getGame(gameId);
        if (game.getRound() >= game.quizSize()) {
            finishGame(gameId, roomCode);
            return;
        }
        game.getPlayers().forEach(player -> player.setAlreadyAnswered(false));
        game.setStartGameTime(System.currentTimeMillis());
        saveGame(game);
        gameNotificationService.notifyGame(
                roomCode,
                GameEventType.QUESTION,
                QuestionResponse.from(game.currentQuestion(), game.getStartGameTime()));
        taskScheduler.schedule(() -> handleEndOfQuestion(gameId, roomCode),
                Instant.now().plusSeconds(game.getAnswerTimeInSeconds()));
    }

    private void handleEndOfQuestion(UUID gameId, String roomCode) {
        Game game = getGame(gameId);
        gameNotificationService.notifyGame(
                roomCode,
                GameEventType.CORRECT_ANSWER,
                CorrectAnswer.from(game));
        taskScheduler.schedule(() -> {
            Game nextRoundGame = getGame(gameId);
            nextRoundGame.incrementRound();
            saveGame(nextRoundGame);
            processQuestionStep(gameId, roomCode);
        }, Instant.now().plusSeconds(DISPLAY_QUESTION_SECONDS));
    }
    private void finishGame(UUID gameId, String roomCode) {
        Game game = getGame(gameId);
        game.setState(GameState.SHOWING_RESULTS);
        saveGame(game);
        gameNotificationService.notifyGame(roomCode, GameEventType.GAME_FINISHED, GameResultResponse.from(game.getPlayers()));
    }

    private void saveGameWithRoomCodeMapping(Game game) {
        saveGame(game);
        String roomCodeKey = getRoomCodeKey(game.getRoomCode());
        redisTemplate.opsForValue().set(roomCodeKey, game.getId(), GameService.SESSION_TTL_SECONDS, TimeUnit.SECONDS);
    }

    private String generateUniqueAccessCode() {
        String code;
        String codeMapKey;
        do {
            code = AccessCodeGenerator.generateRandomCode();
            codeMapKey = getRoomCodeKey(code);
        } while (Boolean.TRUE.equals(redisTemplate.hasKey(codeMapKey)));

        return code;
    }

    private String getGameKey (UUID uuid) {
        return GAME_PREFIX + uuid;
    }

    private String getRoomCodeKey (String roomCode) {
        return ROOM_CODE_PREFIX + roomCode;
    }
}