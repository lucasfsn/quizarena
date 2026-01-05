package com.usermanagement.feature.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponseDto {

    private String id;
    private String firstName;
    private String lastName;
    private String email;
//        private LocalDateTime lastSeen;
}
