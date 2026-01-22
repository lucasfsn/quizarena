package com.quizarena.gameservice.communication.dto;

import lombok.Builder;
import lombok.Value;
import lombok.extern.jackson.Jacksonized;

@Value
@Builder
@Jacksonized
public class Author {

	String firstName;
	String lastName;
}
