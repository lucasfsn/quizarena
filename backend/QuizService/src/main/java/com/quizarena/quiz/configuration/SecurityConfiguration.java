package com.quizarena.quiz.configuration;

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
import java.util.Map;


@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/internal/**").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth2 ->
                        oauth2.jwt(jwt -> {})
                );
        return http.build();
    }


    @Bean
    public JwtDecoder jwtDecoder() {
        return token -> {
            try {
                String payload = token.split("\\.")[1];
                String json = new String(Base64.getUrlDecoder().decode(payload));
                ObjectMapper objectMapper = new ObjectMapper();
                Map<String, Object> claimsMap = objectMapper.readValue(json, new TypeReference<>() {});
                Map<String, Object> headers = Map.of("alg", "none");
                return Jwt.withTokenValue(token)
                        .headers(h -> h.putAll(headers))
                        .claims(c -> c.putAll(claimsMap))
                        .issuedAt(Instant.now())
                        .expiresAt(Instant.now().plusSeconds(3600))
                        .build();
            } catch (Exception e) {
                throw new IllegalArgumentException("Invalid JWT", e);
            }
        };
    }
}