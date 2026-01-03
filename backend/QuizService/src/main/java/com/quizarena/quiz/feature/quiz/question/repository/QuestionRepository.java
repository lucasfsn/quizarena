package com.quizarena.quiz.feature.quiz.question.repository;


import com.quizarena.quiz.feature.quiz.question.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface QuestionRepository extends JpaRepository<Question, UUID> {
}
