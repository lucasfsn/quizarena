package com.usermanagement.core.handler;

import com.usermanagement.core.handler.dto.FieldValidationErrorsDto;
import com.usermanagement.core.handler.enums.BusinessExceptionReason;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class BusinessException extends RuntimeException {
    private final String code;
    private final String message;
    private final HttpStatus httpStatus;
    final List<FieldValidationErrorsDto> errors;


    public BusinessException(final BusinessExceptionReason reason) {
        this.code = reason.getCode();
        this.message = reason.getMessage();
        this.httpStatus = reason.getHttpStatus();
        this.errors = new ArrayList<>();
    }

}