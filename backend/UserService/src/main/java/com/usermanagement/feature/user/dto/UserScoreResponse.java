package com.usermanagement.feature.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserScoreResponse {
    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private Integer score;
}
