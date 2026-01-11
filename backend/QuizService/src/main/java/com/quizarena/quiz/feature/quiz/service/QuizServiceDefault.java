package com.quizarena.quiz.feature.quiz.service;

import com.quizarena.quiz.core.handler.BusinessException;
import com.quizarena.quiz.core.handler.BusinessExceptionReason;
import com.quizarena.quiz.feature.quiz.dto.QuizCreateRequestDto;
import com.quizarena.quiz.feature.quiz.dto.QuizListResponseDto;
import com.quizarena.quiz.feature.quiz.dto.QuizResponseDto;
import com.quizarena.quiz.feature.quiz.mapper.QuizMapper;
import com.quizarena.quiz.feature.quiz.model.Quiz;
import com.quizarena.quiz.feature.quiz.model.QuizCategory;
import com.quizarena.quiz.feature.quiz.question.model.Question;
import com.quizarena.quiz.feature.quiz.question.repository.QuestionRepository;
import com.quizarena.quiz.feature.quiz.question.service.QuestionService;
import com.quizarena.quiz.feature.quiz.repository.QuizRepository;
import com.quizarena.quiz.feature.quiz.user.model.User;
import com.quizarena.quiz.feature.quiz.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class QuizServiceDefault implements QuizService {
    private final QuizMapper quizMapper;
    private final QuizRepository quizRepository;
    private final QuestionService questionService;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public QuizResponseDto createQuiz(Jwt jwt, QuizCreateRequestDto quizCreateRequestDto) {
        UUID userId = UUID.fromString(jwt.getSubject());

        User author = userRepository.findById(userId)
                .orElseGet(() -> {
                    User newUser = User.builder()
                            .id(userId)
                            .firstName((String) jwt.getClaims().get("given_name"))
                            .lastName((String) jwt.getClaims().get("family_name"))
                            .build();
                    return userRepository.save(newUser);
                });
        Quiz quiz = Quiz.builder()
                .title(quizCreateRequestDto.title())
                .category(quizCreateRequestDto.category())
                .user(author)
                .build();
       Quiz savedQuiz = quizRepository.save(quiz);
        List<Question> questions = questionRepository.saveAll(questionService.createQuestionsForQuiz(quizCreateRequestDto.questions(), savedQuiz));
        savedQuiz.setQuestions(questions);
        return quizMapper.quizToQuizResponseDto(savedQuiz);
    }

    @Override
    public Page<QuizListResponseDto> getAllQuizzes(QuizCategory category, String title, String author, Pageable pageable) {
        return quizRepository.findAllWithFilters(category, title, author, pageable).map(quizMapper::quizToQuizListItemDto);
    }

    @Override
    public QuizResponseDto getQuizById(UUID quizId) {
        return quizRepository.findById(quizId).map(quizMapper::quizToQuizResponseDto).orElseThrow(() -> new BusinessException(BusinessExceptionReason.QUIZ_NOT_FOUND));
    }


}
