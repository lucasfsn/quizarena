package com.quizarena.quiz.feature.quiz.user.repository;

import com.quizarena.quiz.feature.quiz.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
}
