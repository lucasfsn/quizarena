import { QuizItem } from '@/app/features/quizzes/types/quiz-item';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-quiz',
  imports: [],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss',
})
export class Quiz {
  public quiz = input.required<QuizItem>();
}
