package com.usermanagement.feature.user.controller;

import com.usermanagement.feature.user.UserFacade;
import com.usermanagement.feature.user.dto.UserResponseDto;
import com.usermanagement.feature.user.dto.UserUpdateRequestDto;
import com.usermanagement.feature.user.model.User;
import com.usermanagement.feature.user.service.UserService;
import com.usermanagement.shared.dto.ResponseDto;
import com.usermanagement.shared.enums.SuccessCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    private final UserFacade userFacade;

    @GetMapping("/test")
    public ResponseEntity<?> test(@AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject(); // ID użytkownika z Keycloak
        String email = jwt.getClaimAsString("email");
        return ResponseEntity.ok("User ID: " + userId + ", Email: " + email);
    }

    @GetMapping("/all-users")
    public ResponseDto<Set<UserResponseDto>> getAllUsers() {
        return new ResponseDto<>(SuccessCode.RESPONSE_SUCCESSFUL, "Successfully fetched user", userFacade.getAllUsers());
    }

    @GetMapping("/get")
    public ResponseDto<UserResponseDto> getUser(@AuthenticationPrincipal Jwt jwt) {
        UserResponseDto user = userFacade.getAndSyncUser(jwt);
        return new ResponseDto<>(SuccessCode.RESPONSE_SUCCESSFUL, "Successfully fetched user", user);
    }

    @PatchMapping("/update")
    public ResponseDto<UserResponseDto> updateUser(@AuthenticationPrincipal Jwt jwt, @RequestBody UserUpdateRequestDto userUpdateRequestDto) {
        UserResponseDto user = userFacade.updateUser(jwt, userUpdateRequestDto);

        return new ResponseDto<>(SuccessCode.RESOURCE_UPDATED, "Successfully updated user", user);
    }

}
