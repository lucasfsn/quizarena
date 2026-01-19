package com.usermanagement.feature.user.dto;

public record UserUpdateRequestDto(
       String username,
       String email,
       String firstName,
       String lastName,
       String password
) {}
