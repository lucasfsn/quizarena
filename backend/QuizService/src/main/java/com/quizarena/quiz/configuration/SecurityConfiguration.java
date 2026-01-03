package com.quizarena.quiz.configuration;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.web.SecurityFilterChain;

import java.time.Instant;
import java.util.Base64;
import java.util.Collections;
import java.util.Map;


@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth.anyRequest().authenticated())
                .oauth2ResourceServer(oauth2 ->
                        oauth2.jwt(jwt -> {})
                );

        return http.build();
    }


    @Bean
    public JwtDecoder jwtDecoder() {
        return token -> {
            try {
                // Parsowanie payload JWT
                String payload = token.split("\\.")[1];
                String json = new String(Base64.getUrlDecoder().decode(payload));
                ObjectMapper objectMapper = new ObjectMapper();
                Map<String, Object> claimsMap = objectMapper.readValue(json, new TypeReference<>() {});
                Map<String, Object> headers = Map.of("alg", "none");
                // Tworzymy Jwt
                return Jwt.withTokenValue(token)
                        .headers(h -> h.putAll(headers))             // pusty Consumer dla headerów
                        .claims(c -> c.putAll(claimsMap)) // <- tutaj używamy Consumer zamiast Map
                        .issuedAt(Instant.now())
                        .expiresAt(Instant.now().plusSeconds(3600))
                        .build();

            } catch (Exception e) {
                throw new IllegalArgumentException("Invalid JWT", e);
            }
        };
    }
}

//ethod filterChain in com.quizarena.quiz.configuration.SecurityConfiguration required a bean of type 'org.springframework.security.oauth2.jwt.JwtDecoder' that could not be found