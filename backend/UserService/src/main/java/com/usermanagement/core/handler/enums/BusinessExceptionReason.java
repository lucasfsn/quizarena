package com.usermanagement.core.handler.enums;

import com.usermanagement.core.handler.dto.FieldValidationErrorsDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.util.List;

@Getter
@AllArgsConstructor
public enum BusinessExceptionReason {
    USER_NOT_FOUND("User was not found", HttpStatus.NOT_FOUND, null),
    QUIZ_NOT_FOUND("Quiz was not found", HttpStatus.NOT_FOUND, null),
    USER_ALREADY_EXISTS("User already exists", HttpStatus.CONFLICT, null);

    private final String code = name();
    private final String message;
    private final HttpStatus httpStatus;
    private final List<FieldValidationErrorsDto> errors;
}