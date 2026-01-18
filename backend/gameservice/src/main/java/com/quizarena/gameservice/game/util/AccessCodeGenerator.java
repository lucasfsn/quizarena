package com.quizarena.gameservice.game.util;

import java.util.Random;

public class AccessCodeGenerator {
    private final static int MIN = 100000;
    private final static int MAX = 999999;

    public static String generateRandomCode() {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        int randomNumber = random.nextInt(MAX - MIN + 1) + MIN;
        sb.append(randomNumber);
        return sb.toString();
    }
}