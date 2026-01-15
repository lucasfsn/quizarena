package com.usermanagement.shared.dto;

import com.usermanagement.core.handler.dto.FieldValidationErrorsDto;
import com.usermanagement.shared.enums.SuccessCode;
import jakarta.annotation.Nullable;

import java.time.LocalDateTime;
import java.util.List;

public record ResponseDto<T>(
        SuccessCode code,
        String message,
        LocalDateTime timestamp,
        T data) {

    public ResponseDto(SuccessCode code, String message, T data) {
        this(code, message, LocalDateTime.now(), data);
    }
}