package com.usermanagement.core.handler.dto;

import com.usermanagement.core.handler.enums.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FieldValidationErrorsDto {
    private ErrorCode errorCode;
    private String field;
    private String message;
}
