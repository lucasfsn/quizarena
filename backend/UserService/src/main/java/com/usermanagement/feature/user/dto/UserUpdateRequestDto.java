package com.usermanagement.feature.user.dto;

import lombok.Getter;
import lombok.Setter;

public record UserUpdateRequestDto(
       String username,
       String email,
       String firstName,
       String lastName,
       String password
) {
}


//username?: string;
//email?: string;
//firstName?: string;
//lastName?: string;
//password?: {
//currentPassword: string;
//newPassword: string;
//  };