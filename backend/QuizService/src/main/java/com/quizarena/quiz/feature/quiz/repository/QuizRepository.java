package com.quizarena.quiz.feature.quiz.repository;

import com.quizarena.quiz.feature.quiz.model.Quiz;
import com.quizarena.quiz.feature.quiz.model.QuizCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, UUID> {

    @Query("""
    SELECT q FROM Quiz q
    WHERE (:category IS NULL OR q.category = :category)
      AND (
        :title IS NULL OR
        q.title ILIKE CONCAT('%', CAST(:title AS string), '%')
      )
""")
    Page<Quiz> findAllWithFilters(
            @Param("category") QuizCategory category,
            @Param("title") String title,
            Pageable pageable
    );
}
//
//@Query("""
//        SELECT q FROM Quiz q
//        WHERE (:category IS NULL OR q.category = :category)
//          AND (:title IS NULL OR LOWER(q.title) LIKE LOWER(CONCAT('%', :title, '%')))
//          AND (:author IS NULL OR LOWER(q.) LIKE LOWER(CONCAT('%', :author, '%')))
//    """)