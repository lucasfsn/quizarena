package com.usermanagement.feature.user.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record UserUpdateRequestDto(
       @NotNull @Min(2) String username,
       @NotNull String email,
       @NotNull String firstName,
       @NotNull String lastName,
       @NotNull String password
) {}
