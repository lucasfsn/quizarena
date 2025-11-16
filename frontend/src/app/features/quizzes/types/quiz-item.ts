export interface QuizItem {
  id: string;
  title: string;
  category: string;
  author: string | null;
  questionsCount: number;
}
