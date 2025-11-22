import { QuizSkeleton } from '@/app/features/quizzes/components/quiz-skeleton/quiz-skeleton';
import { Quiz } from '@/app/features/quizzes/components/quiz/quiz';
import { QuizItem } from '@/app/features/quizzes/types/quiz-item';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-list',
  imports: [Quiz, QuizSkeleton],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  public quizzes = input.required<QuizItem[]>();
  public skeletonCount = input.required<number>();
  public isPending = input.required<boolean>();
  public isFetching = input.required<boolean>();
}
