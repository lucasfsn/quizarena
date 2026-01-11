package com.quizarena.quiz.feature.quiz.controller;

import com.quizarena.quiz.feature.quiz.dto.QuizCreateRequestDto;
import com.quizarena.quiz.feature.quiz.dto.QuizDetailsResponseDto;
import com.quizarena.quiz.feature.quiz.dto.QuizResponseDto;
import com.quizarena.quiz.feature.quiz.model.QuizCategory;
import com.quizarena.quiz.feature.quiz.service.QuizService;
import com.quizarena.quiz.shared.dto.ResponseDto;
import com.quizarena.quiz.shared.enums.SuccessCode;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.security.oauth2.jwt.Jwt;

import java.net.URI;
import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
public class QuizController {
    private static final String ID = "/{quizId}";
    private final QuizService quizService;

    @GetMapping("/quizzes")
    public ResponseDto<Page<QuizResponseDto>> getAllQuizzes(
            @RequestParam(required = false) QuizCategory category,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String author,
            Pageable pageable) {
        Page<QuizResponseDto> quizzes = quizService.getAllQuizzes(category, title, author, pageable);
        return new ResponseDto<>(SuccessCode.RESPONSE_SUCCESSFUL, "Successfully fetched quizzes", quizzes);
    }

    @PostMapping("/quizzes")
    public ResponseEntity<ResponseDto<QuizResponseDto>> createQuiz(
            @AuthenticationPrincipal Jwt jwt,
            @RequestBody @Valid QuizCreateRequestDto quizCreateRequestDto
            )
    {
        QuizResponseDto quizResponseDto = quizService.createQuiz(jwt, quizCreateRequestDto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path(ID)
                .buildAndExpand(quizResponseDto.getId())
                .toUri();

        return ResponseEntity.created(uri).body(new ResponseDto<>(SuccessCode.RESOURCE_CREATED, "Quiz created successfully", quizResponseDto));
    }

    @GetMapping("/quizzes"+ID)
    public ResponseDto<QuizResponseDto> getQuiz(@PathVariable UUID quizId) {
        return new ResponseDto<>(
                SuccessCode.RESPONSE_SUCCESSFUL,
                "Successfully fetched quiz",
                quizService.getQuizById(quizId)
        );
    }

    @GetMapping("internal/quizzes"+ID)
    public ResponseDto<QuizDetailsResponseDto> getQuizDetails(@PathVariable UUID quizId) {
        return new ResponseDto<>(
                SuccessCode.RESPONSE_SUCCESSFUL,
                "Successfully fetched quiz",
                quizService.getDetailedQuiz(quizId)
        );
    }
}
