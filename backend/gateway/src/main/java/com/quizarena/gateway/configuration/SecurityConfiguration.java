package com.quizarena.gateway.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfiguration {


    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {

        http
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .authorizeExchange(exchanges -> exchanges
                        .pathMatchers("/hello-world").permitAll()
                        .pathMatchers("/**").permitAll()
                        .anyExchange().authenticated()
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.jwtAuthenticationConverter(new JWTAuthConverter()))
                );

        return http.build();

//        http
////                .csrf(AbstractHttpConfigurer::disable)
//                .csrf(csfr -> csfr.disable())
//                .authorizeHttpRequests(auth -> auth
//                                .requestMatchers("/**").permitAll()
//                                .requestMatchers("/hello-world").permitAll()
//                                .requestMatchers(HttpMethod.POST, "/**").permitAll()
////                        .anyRequest().authenticated()
//                                .anyRequest().permitAll() // so far we let that say
//                )
//                .oauth2ResourceServer(oauth2 -> oauth2
//                        .jwt(jwt -> jwt
//                                .jwtAuthenticationConverter(new JWTAuthConverter())
//                        )
//                )
//                .sessionManagement(session -> session
//                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                );

//        return http.build();
    }



    //Spring Clound Gateway does it declaratively in yaml - we are NOT using servlets
//    private CorsConfigurationSource corsConfigurationSource() {
//        return request -> {
//            CorsConfiguration configuration = new CorsConfiguration();
//            configuration.setAllowedOrigins(List.of("*"));
//            configuration.setAllowedMethods(List.of("*"));
//            configuration.setAllowedHeaders(List.of("*"));
//            return configuration;
//        };
//    }

//    @Bean
//    public JwtDecoder jwtDecoder() {
//        return NimbusJwtDecoder.withJwkSetUri("http://keycloak:8080/realms/quizarena/protocol/openid-connect/certs").build();
//    }
}
