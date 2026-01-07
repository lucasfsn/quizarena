package com.quizarena.gameservice.quizsession.util;

import java.util.UUID;

public class UserSessionService {
    public static UUID getLoggedInUserId() {
        return UUID.randomUUID();
    }
}
