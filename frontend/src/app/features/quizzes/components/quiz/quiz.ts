import { QuizItem } from '@/app/features/quizzes/types/quiz-item';
import { getCategoryImagePath } from '@/app/shared/utils/get-category-image-path';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-quiz',
  imports: [],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss',
})
export class Quiz {
  public quiz = input.required<QuizItem>();

  protected categoryImagePath = computed(() => getCategoryImagePath(this.quiz().category));
}
