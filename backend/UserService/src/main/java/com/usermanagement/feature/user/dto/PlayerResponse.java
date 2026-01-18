package com.usermanagement.feature.user.dto;

import com.usermanagement.feature.user.enums.PlayerRole;
import com.usermanagement.feature.user.model.User;
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

    public static PlayerResponse from(User player) {
        return PlayerResponse.builder()
                .id(player.getId())
//                .userId(player.getUserId())
                .role(player.getRole())
                .firstName(player.getFirstName())
                .lastName(player.getLastName())
                .build();
    }
}