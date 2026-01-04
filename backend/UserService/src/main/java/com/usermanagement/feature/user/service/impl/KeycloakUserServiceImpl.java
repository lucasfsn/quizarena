package com.usermanagement.feature.user.service.impl;

import com.usermanagement.feature.user.service.KeycloakUserService;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KeycloakUserServiceImpl implements KeycloakUserService {

    @Value("${app.keycloak.realm}")
    private String realm;

    private final Keycloak keycloak;

//    public void createUser()

    @Override
    public void updateUser() {

    }

}
