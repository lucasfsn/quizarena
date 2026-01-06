package com.quizarena.gameservice.player.dto;

import com.quizarena.gameservice.player.enums.PlayerRole;
import com.quizarena.gameservice.player.model.Player;
import lombok.Builder;
import lombok.Value;

import java.util.UUID;

@Value
@Builder
public class PlayerResponse {
    UUID id;
    UUID userId;
    PlayerRole role;
    String firstName;
    String lastName;

    public static PlayerResponse from(Player player) {
        return PlayerResponse.builder()
                .id(player.getId())
                .userId(player.getUserId())
                .role(player.getRole())
                .firstName(player.getFirstName())
                .lastName(player.getLastName())
                .build();
    }
}
