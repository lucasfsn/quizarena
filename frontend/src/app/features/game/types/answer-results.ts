interface Result {
  answerId: string;
  count: number;
}

export interface AnswerResults {
  questionId: string;
  totalAnswers: number;
  results: Result[];
}
