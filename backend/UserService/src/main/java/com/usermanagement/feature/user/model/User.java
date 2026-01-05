package com.usermanagement.feature.user.model;

import com.usermanagement.feature.user.constants.UserConstants;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

//User {
//    id
//    firstName
//    lastName
//    score
//    winCount
//    winPercentage
//    gamesTotal
//}
//

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
@NamedQuery(name = UserConstants.FIND_USER_BY_EMAIL,
        query = "SELECT u FROM User u WHERE u.email = :email"
)
@NamedQuery(name = UserConstants.FIND_ALL_USERS_EXCEPT_SELF,
        query = "SELECT u FROM User u WHERE u.id != :publicId")
@NamedQuery(name = UserConstants.FIND_USER_BY_PUBLIC_ID,
        query = "SELECT u FROM User u WHERE u.id = :publicId")
public class User {

    @Id
    private String id;

    private String userName;

    private String firstName;

    private String lastName;

    private String email;

    private Double score;

    private Double winCount;

    private Double winPercentage;

    private Long gamesTotal;
}
