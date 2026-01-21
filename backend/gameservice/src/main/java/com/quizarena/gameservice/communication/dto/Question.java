package com.quizarena.gameservice.communication.dto;

import java.util.List;
import java.util.stream.IntStream;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Question {

	private String text;
	private List<Answer> answers;

	public List<Integer> correctAnswerIndices() {
		return IntStream.range(0, answers.size())
			.filter(i -> answers.get(i).getIsCorrect())
			.boxed()
			.toList();
	}
}
