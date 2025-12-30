// package com.usermanagement.configuration;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpMethod;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.oauth2.jwt.JwtDecoder;
// import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;

// import java.util.List;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
//                 .csrf(AbstractHttpConfigurer::disable)
//                 .authorizeHttpRequests(auth -> auth
//                                 .requestMatchers("/**").permitAll()
//                                 .requestMatchers("/hello-world").permitAll()
//                                 .requestMatchers(HttpMethod.POST, "/**").permitAll()
// //                        .anyRequest().authenticated()
//                                 .anyRequest().permitAll() // so far we let that say
//                 )
//                 .oauth2ResourceServer(oauth2 -> oauth2
//                         .jwt(jwt -> jwt
//                                 .jwtAuthenticationConverter(new JwtAuthConverter())
//                         )
//                 )
//                 .sessionManagement(session -> session
//                         .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                 );

//         return http.build();
//     }

//     private CorsConfigurationSource corsConfigurationSource() {
//         return request -> {
//             CorsConfiguration configuration = new CorsConfiguration();
//             configuration.setAllowedOrigins(List.of("*"));
//             configuration.setAllowedMethods(List.of("*"));
//             configuration.setAllowedHeaders(List.of("*"));
//             return configuration;
//         };
//     }

//     @Bean
//     public JwtDecoder jwtDecoder() {
//         return NimbusJwtDecoder.withJwkSetUri("http://keycloak:8080/realms/quizarena/protocol/openid-connect/certs").build();
//     }
// }
