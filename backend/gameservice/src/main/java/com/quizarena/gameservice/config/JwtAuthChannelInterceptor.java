package com.quizarena.gameservice.config;

import com.nimbusds.jwt.JWT;
import com.nimbusds.jwt.JWTParser;
import com.quizarena.gameservice.game.service.GameValidationService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.time.Instant;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
@RequiredArgsConstructor
public class JwtAuthChannelInterceptor implements ChannelInterceptor {

    private final GameValidationService gameValidationService;

    private static final Pattern GAME_TOPIC_PATTERN =
            Pattern.compile("^/topic/game/([a-zA-Z0-9]+)$");

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        StompCommand command = accessor.getCommand();

        if (accessor.getUser() == null && accessor.getSessionAttributes() != null) {
            Principal savedUser = (Principal) accessor.getSessionAttributes().get("user");
            if (savedUser != null) {
                accessor.setUser(savedUser);
            }
        }

        if (StompCommand.CONNECT.equals(command)) {
            String authHeader = accessor.getFirstNativeHeader("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                try {
                    String token = authHeader.substring(7);
                    JWT parsedJwt = JWTParser.parse(token);
                    var claimsSet = parsedJwt.getJWTClaimsSet();

                    Instant iat = claimsSet.getIssueTime() != null ? claimsSet.getIssueTime().toInstant() : Instant.now();
                    Instant exp = claimsSet.getExpirationTime() != null ? claimsSet.getExpirationTime().toInstant() : iat.plusSeconds(3600);

                    Jwt jwt = Jwt.withTokenValue(token)
                            .header("alg", parsedJwt.getHeader().toJSONObject().getOrDefault("alg", "none"))
                            .subject(claimsSet.getSubject())
                            .issuedAt(iat)
                            .expiresAt(exp)
                            .claims(claims -> {
                                Map<String, Object> allClaims = claimsSet.getClaims();
                                allClaims.forEach((key, value) -> {
                                    if (!"iat".equals(key) && !"exp".equals(key)) {
                                        claims.put(key, value);
                                    }
                                });
                            })
                            .build();

                    JwtAuthenticationToken auth = new JwtAuthenticationToken(jwt);

                    accessor.setUser(auth);
                    if (accessor.getSessionAttributes() != null) {
                        accessor.getSessionAttributes().put("user", auth);
                    }

                    System.out.println("WebSocket connection authenticated for user: " + claimsSet.getSubject());
                } catch (Exception e) {
                    System.err.println("Failed to parse JWT: " + e.getMessage());
                    throw new AccessDeniedException("Invalid token");
                }
            }
        }

        if (StompCommand.SUBSCRIBE.equals(command)) {
            Principal user = accessor.getUser();
            if (!(user instanceof JwtAuthenticationToken auth)) {
                return null;
            }

            String destination = accessor.getDestination();
            if (destination != null) {
                Matcher matcher = GAME_TOPIC_PATTERN.matcher(destination);
                if (matcher.matches()) {
                    String roomCode = matcher.group(1);
                    UUID userId = UUID.fromString(auth.getToken().getSubject());

                    System.out.println("Validating access for user " + userId + " to room " + roomCode);
                    try {
                        gameValidationService.validateUserInGame(roomCode, userId);
                    } catch (Exception e) {
                        return null;
                    }
                }
            }
        }

        return message;
    }
}