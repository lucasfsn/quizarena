package com.usermanagement.feature.user.controller;

import com.usermanagement.feature.user.dto.UserResponseDto;
import com.usermanagement.feature.user.service.UserService;
import com.usermanagement.shared.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/test")
    public ResponseEntity<?> test(@AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject(); // ID użytkownika z Keycloak
        String email = jwt.getClaimAsString("email");
        return ResponseEntity.ok("User ID: " + userId + ", Email: " + email);
    }

    @GetMapping
    public ResponseDto<UserResponseDto> getUser() {
        return null;
    }
}
