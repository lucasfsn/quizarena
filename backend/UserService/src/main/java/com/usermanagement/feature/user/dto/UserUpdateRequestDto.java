package com.usermanagement.feature.user.dto;

import jakarta.validation.constraints.Min;

public record UserUpdateRequestDto(
       @Min(2) String username,
       String email,
       String firstName,
       String lastName,
       String password
) {}
