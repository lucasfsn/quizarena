package com.quizarena.quiz.feature.quiz.model;

public enum QuizCategory {
    GENERAL_KNOWLEDGE("General Knowledge"),
    SCIENCE_AND_NATURE("Science & Nature"),
    HISTORY("History"),
    GEOGRAPHY("Geography"),
    SPORTS("Sports"),
    ENTERTAINMENT("Entertainment"),
    ART_AND_LITERATURE("Art & Literature"),
    TECHNOLOGY("Technology"),
    MATHEMATICS("Mathematics"),
    POP_CULTURE("Pop Culture");

    private final String displayName;

    QuizCategory(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}