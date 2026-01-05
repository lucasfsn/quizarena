package com.usermanagement.feature.user.service.impl;

import com.usermanagement.feature.user.dto.UserUpdateRequestDto;
import com.usermanagement.feature.user.service.KeycloakUserService;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class KeycloakUserServiceImpl implements KeycloakUserService {

    @Value("${app.keycloak.realm}")
    private String realm;

    private final Keycloak keycloak;

    private UsersResource getInstance() {
        return keycloak.realm(realm).users();
    }

//    public void createUser()

    @Override
    public void updateUser(Jwt jwt, UserUpdateRequestDto userUpdateRequestDto) {

        UsersResource usersResource = getInstance();

//        CredentialRepresentation passwordCredentials = new CredentialRepresentation();
//        passwordCredentials.setTemporary(false);
//        passwordCredentials.setType(CredentialRepresentation.PASSWORD);
//        passwordCredentials.setValue(userUpdateRequestDto.password());

//        UserRepresentation user = new UserRepresentation();
        UserRepresentation user = usersResource.get(jwt.getSubject()).toRepresentation();
        user.setUsername(userUpdateRequestDto.username());
        user.setFirstName(userUpdateRequestDto.firstName());
        user.setLastName(userUpdateRequestDto.lastName());
        user.setEmail(userUpdateRequestDto.email());
//        user.setCredentials(Collections.singletonList(passwordCredentials));

//        UsersResource usersResource = getInstance();
        usersResource.get(jwt.getSubject()).update(user);

    }

}
