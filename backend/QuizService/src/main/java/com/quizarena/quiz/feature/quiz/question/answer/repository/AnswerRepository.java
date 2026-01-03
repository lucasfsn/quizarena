package com.quizarena.quiz.feature.quiz.question.answer.repository;

import com.quizarena.quiz.feature.quiz.question.answer.model.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, UUID> {
}
