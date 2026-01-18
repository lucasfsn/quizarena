package com.quizarena.gameservice.game.repository;

import com.quizarena.gameservice.exception.EntityNotFoundException;
import com.quizarena.gameservice.game.model.Game;
import com.quizarena.gameservice.game.util.AccessCodeGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Repository
@RequiredArgsConstructor
public class GameRepository {
    private static final String GAME_PREFIX = "game:";
    private static final String ROOM_CODE_PREFIX = "roomcode:";
    private static final long SESSION_TTL_SECONDS = 3600;

    private final RedisTemplate<String, Object> redisTemplate;

    public void saveGame(Game game) {
        String key = getGameKey(game.getId());
        redisTemplate.opsForValue().set(key, game, SESSION_TTL_SECONDS, TimeUnit.SECONDS);
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

    public void deleteGame(final Game game) {
        redisTemplate.delete(getGameKey(game.getId()));
        redisTemplate.delete(getRoomCodeKey(game.getRoomCode()));
    }

    public void deleteGameRoomCode(final String roomCode) {
        String roomCodeKey = getRoomCodeKey(roomCode);
        redisTemplate.delete(roomCodeKey);
    }

    public void saveGameWithRoomCodeMapping(final Game game) {
        saveGame(game);
        String roomCodeKey = getRoomCodeKey(game.getRoomCode());
        redisTemplate.opsForValue().set(roomCodeKey, game.getId(), SESSION_TTL_SECONDS, TimeUnit.SECONDS);
    }

    public String generateUniqueAccessCode() {
        String code;
        String codeMapKey;
        do {
            code = AccessCodeGenerator.generateRandomCode();
            codeMapKey = getRoomCodeKey(code);
        } while (Boolean.TRUE.equals(redisTemplate.hasKey(codeMapKey)));

        return code;
    }

    private String getGameKey(UUID uuid) { return GAME_PREFIX + uuid; }
    private String getRoomCodeKey(String roomCode) { return ROOM_CODE_PREFIX + roomCode; }
}