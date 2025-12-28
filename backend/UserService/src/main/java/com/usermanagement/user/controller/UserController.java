package com.usermanagement.user.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class UserController {

    @GetMapping
    public String hello() {
        return "unprotected";
    }

    @GetMapping("/sec")
    @PreAuthorize("hasRole('client_admin')")
    public String helloSecured() {
        return "protected";
    }
}
