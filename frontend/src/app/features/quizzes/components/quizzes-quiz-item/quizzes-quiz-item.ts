import { QuizPreview } from '@/app/features/quizzes/types/quiz-preview';
import { getCategoryImagePath } from '@/app/shared/utils/get-category-image-path';
import { NgOptimizedImage } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quizzes-quiz-item',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './quizzes-quiz-item.html',
  styleUrl: './quizzes-quiz-item.scss',
})
export class QuizzesQuizItem {
  public quiz = input.required<QuizPreview>();

  protected categoryImagePath = computed(() => getCategoryImagePath(this.quiz().category));
}
