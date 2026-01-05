//package com.usermanagement.user.controller;
//
//// import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.oauth2.jwt.Jwt;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/test")
//public class UserController {
//
//    @GetMapping
//    public String hello() {
//        return "unprotected";
//    }
//
//    @GetMapping("/test")
//    public ResponseEntity<?> test(@AuthenticationPrincipal Jwt jwt) {
//        String userId = jwt.getSubject(); // ID użytkownika z Keycloak
//        String email = jwt.getClaimAsString("email");
//        return ResponseEntity.ok("User ID: " + userId + ", Email: " + email);
//    }
//
//    @GetMapping("/sec")
//    public String helloSecured() {
//        return "protected";
//    }
//}
