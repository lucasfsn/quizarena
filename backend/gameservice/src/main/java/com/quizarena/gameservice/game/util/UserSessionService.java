package com.quizarena.gameservice.game.util;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.Optional;
import java.util.UUID;

public class UserSessionService {
    private final static String USER_ID = "sub";
    private final static String FIRST_NAME="given_name";
    private final static String LAST_NAME="family_name";

    public static UUID getLoggedInUserId(Jwt jwt) {
        return UUID.fromString(getClaim(jwt, USER_ID));
    }

    public static String getLoggedInUserFirstName(Jwt jwt) {
        return getClaim(jwt, FIRST_NAME);
    }

    public static String getLoggedInUserLastName(Jwt jwt) {
        return getClaim(jwt, LAST_NAME);
    }

    private static String getClaim(Jwt jwt, String claimName) {
        return Optional.ofNullable(jwt.getClaimAsString(claimName))
                .orElseThrow(() -> new AccessDeniedException("Claim " + claimName + " not found"));
    }
}
