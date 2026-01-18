package com.quizarena.gameservice.exception;

import com.quizarena.gameservice.exception.dto.ErrorResponseBuilder;
import com.quizarena.gameservice.exception.dto.ErrorResponseDto;
import com.quizarena.gameservice.exception.dto.FieldValidationErrorsDto;
import jakarta.annotation.Nonnull;
import jakarta.validation.Path;
import jakarta.validation.constraints.NotNull;
import lombok.extern.slf4j.Slf4j;
import jakarta.validation.ConstraintViolationException;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.MissingRequestHeaderException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.io.UncheckedIOException;
import java.util.ArrayList;
import java.util.List;

import static java.lang.String.format;
import static java.util.Collections.singletonList;

@ControllerAdvice
@Slf4j
public class GlobalApiExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(value = {Exception.class})
    public ResponseEntity<ErrorResponseDto> handleUncaughtException(
            final Exception exception, final ServletWebRequest request) {
        if (log.isErrorEnabled()) {
            log.error(exception.getMessage(), exception);
        }
        final ErrorResponseDto errorResponseDto =
                ErrorResponseBuilder.build(
                        Exception.class.getSimpleName(),
                        HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponseDto);
    }

    @ExceptionHandler({BusinessException.class})
    public ResponseEntity<ErrorResponseDto> handleCustomUncaughtBusinessException(
            final BusinessException exception, final ServletWebRequest request) {
        if (log.isErrorEnabled()) {
            log.error(exception.getMessage(), exception);
        }
        final ErrorResponseDto errorResponseDto =
                ErrorResponseBuilder.build(
                        exception.getCode(), exception.getMessage(), exception.getErrors());
        return ResponseEntity.status(exception.getHttpStatus()).body(errorResponseDto);
    }

    @ExceptionHandler({IllegalArgumentException.class})
    public ResponseEntity<ErrorResponseDto> handleIllegalArgumentException(
            final IllegalArgumentException exception) {
        if (log.isErrorEnabled()) {
            log.error(exception.getMessage(), exception);
        }

        ErrorCode code;
        if (exception.getMessage().contains("not found")) {
            code = ErrorCode.NOT_FOUND;
        } else {
            code = ErrorCode.BAD_REQUEST;
        }

        final ErrorResponseDto errorResponseDto =
                ErrorResponseBuilder.build(code.getName(), exception.getMessage());
        return ResponseEntity.status(code.getHttpStatus()).body(errorResponseDto);
    }

    @ExceptionHandler({IllegalStateException.class})
    public ResponseEntity<ErrorResponseDto> handleIllegalStateException(
            final IllegalStateException exception) {
        if (log.isErrorEnabled()) {
            log.error("Illegal state exception: {}", exception.getMessage());
        }

        ErrorCode code = ErrorCode.INVALID_STATE;
        final ErrorResponseDto errorResponseDto =
                ErrorResponseBuilder.build(
                        code.getName(),
                        exception.getMessage());

        return ResponseEntity.status(code.getHttpStatus()).body(errorResponseDto);
    }

    @ExceptionHandler({UncheckedIOException.class})
    public ResponseEntity<ErrorResponseDto> handleUncheckedIOException(
            final UncheckedIOException exception) {
        if (log.isErrorEnabled()) {
            log.error(exception.getMessage(), exception);
        }

        ErrorCode code;
        if (exception.getMessage().contains("not found")) {
            code = ErrorCode.NOT_FOUND;
        } else {
            code = ErrorCode.BAD_REQUEST;
        }

        final ErrorResponseDto errorResponseDto =
                ErrorResponseBuilder.build(code.getName(), exception.getMessage());
        return ResponseEntity.status(code.getHttpStatus()).body(errorResponseDto);
    }

    private static ResponseEntity<Object> handleStandardException(
            @Nonnull Exception exception, @Nonnull ErrorCode code) {
        if (log.isErrorEnabled()) {
            log.error(exception.getMessage(), exception);
        }
        final ErrorResponseDto errorResponseDto =
                ErrorResponseBuilder.build(code.getName(), code.getMessage());
        return ResponseEntity.status(code.getHttpStatus()).body(errorResponseDto);
    }

    private static ServletMissingParameter getServletMissingParameter(
            ServletRequestBindingException exception) {
        final String missingParameter;
        final String missingParameterType;

        switch (exception) {
            case MissingRequestHeaderException missingRequestHeaderException -> {
                missingParameter = missingRequestHeaderException.getHeaderName();
                missingParameterType = "header";
            }
            case MissingServletRequestParameterException
                         missingServletRequestParameterException -> {
                missingParameter = missingServletRequestParameterException.getParameterName();
                missingParameterType = "query";
            }
            case MissingPathVariableException missingPathVariableException -> {
                missingParameter = missingPathVariableException.getVariableName();
                missingParameterType = "path";
            }
            default -> {
                missingParameter = "unknown";
                missingParameterType = "unknown";
            }
        }
        return new ServletMissingParameter(missingParameter, missingParameterType);
    }

    @ExceptionHandler({EntityNotFoundException.class})
    public ResponseEntity<Object> handleEntityNotFoundException(EntityNotFoundException exception) {
        return handleStandardException(exception, ErrorCode.NOT_FOUND);
    }

    @ExceptionHandler({DataIntegrityViolationException.class})
    public ResponseEntity<Object> handleDataIntegrityViolation(
            DataIntegrityViolationException exception) {
        return handleStandardException(exception, ErrorCode.CONFLICT);
    }

    @ExceptionHandler({DataAccessException.class})
    public ResponseEntity<Object> handleDataAccessException(DataAccessException exception) {
        return handleStandardException(exception, ErrorCode.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler({AccessDeniedException.class})
    public ResponseEntity<ErrorResponseDto> handleAccessDeniedException(
            final AccessDeniedException exception, final ServletWebRequest request) {
        if (log.isWarnEnabled()) {
            log.warn("Access denied: {}", exception.getMessage());
        }
        final ErrorCode code = ErrorCode.FORBIDDEN;
        final ErrorResponseDto errorResponseDto =
                ErrorResponseBuilder.build(
                        code.getName(),
                        "You do not have permission to access this resource");
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponseDto);
    }

    @NotNull
    private ResponseEntity<Object> getObjectResponseEntity(
            ErrorCode code, ServletMissingParameter servletMissingParameter) {
        final FieldValidationErrorsDto missingParameterDto =
                FieldValidationErrorsDto.builder()
                        .errorCode(code)
                        .field(servletMissingParameter.missingParameter())
                        .message(
                                format(
                                        "Missing %s parameter with name '%s'",
                                        servletMissingParameter.missingParameterType(),
                                        servletMissingParameter.missingParameter()))
                        .build();

        final ErrorResponseDto errorResponseDto =
                ErrorResponseBuilder.build(
                        code.getName(),
                        code.getHttpStatus().getReasonPhrase(),
                        singletonList(missingParameterDto));

        return ResponseEntity.status(code.getHttpStatus()).body(errorResponseDto);
    }

    @ExceptionHandler({ConstraintViolationException.class})
    public ResponseEntity<Object> handleConstraintViolationException(
            final ConstraintViolationException exception, final ServletWebRequest request) {
        if (log.isErrorEnabled()) {
            log.error(exception.getMessage(), exception);
        }
        final List<FieldValidationErrorsDto> invalidParameters =
                processInvalidParameters(exception);
        final ErrorCode code = ErrorCode.BAD_REQUEST;

        final ErrorResponseDto errorResponseDto =
                ErrorResponseBuilder.build(
                        code.getName(), code.getHttpStatus().getReasonPhrase(), invalidParameters);

        return ResponseEntity.status(code.getHttpStatus()).body(errorResponseDto);
    }

    @ExceptionHandler(PropertyReferenceException.class)
    public ResponseEntity<Object> handlePropertyReferenceException(
            final PropertyReferenceException exception, final ServletWebRequest request) {
        if (log.isErrorEnabled()) {
            log.error(exception.getMessage(), exception);
        }

        final FieldValidationErrorsDto error =
                FieldValidationErrorsDto.builder()
                        .errorCode(ErrorCode.BAD_REQUEST)
                        .field("sort")
                        .message("Invalid sort property: '" + exception.getPropertyName() + "'")
                        .build();

        final ErrorResponseDto errorResponseDto =
                ErrorResponseBuilder.build(
                        ErrorCode.BAD_REQUEST.getName(),
                        ErrorCode.BAD_REQUEST.getHttpStatus().getReasonPhrase(),
                        List.of(error));

        return ResponseEntity.status(ErrorCode.BAD_REQUEST.getHttpStatus()).body(errorResponseDto);
    }

    private List<FieldValidationErrorsDto> processInvalidParameters(
            ConstraintViolationException exception) {
        final List<FieldValidationErrorsDto> invalidParameters = new ArrayList<>();
        exception
                .getConstraintViolations()
                .forEach(
                        constraintViolation -> {
                            Path propertyPath = constraintViolation.getPropertyPath();
                            List<String> path = new ArrayList<>();
                            propertyPath.forEach(property -> path.add(property.toString()));
                            final FieldValidationErrorsDto errors = new FieldValidationErrorsDto();
                            errors.setErrorCode(ErrorCode.BAD_REQUEST);
                            errors.setField(path.getLast());
                            errors.setMessage(constraintViolation.getMessage());
                            invalidParameters.add(errors);
                        });
        return invalidParameters;
    }

    private record ServletMissingParameter(String missingParameter, String missingParameterType) {}
}
