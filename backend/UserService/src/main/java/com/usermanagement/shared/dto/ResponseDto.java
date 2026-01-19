package com.usermanagement.shared.dto;

import com.usermanagement.shared.enums.SuccessCode;

import java.time.LocalDateTime;

public record ResponseDto<T>(
        SuccessCode code,
        String message,
        LocalDateTime timestamp,
        T data) {

    public ResponseDto(SuccessCode code, String message, T data) {
        this(code, message, LocalDateTime.now(), data);
    }
}