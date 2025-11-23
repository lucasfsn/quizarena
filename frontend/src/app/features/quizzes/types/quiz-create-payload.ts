export interface QuizCreatePayload {
  title: string;
  questions: {
    text: string;
    answers: { text: string; isCorrect: boolean }[];
  }[];
}
