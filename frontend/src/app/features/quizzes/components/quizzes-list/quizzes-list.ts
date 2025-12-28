import { QuizSkeleton } from '@/app/features/quizzes/components/quiz-skeleton/quiz-skeleton';
import { QuizzesQuizItem } from '@/app/features/quizzes/components/quizzes-quiz-item/quizzes-quiz-item';
import { QuizPreview } from '@/app/features/quizzes/types/quiz-preview';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-quizzes-list',
  imports: [QuizSkeleton, QuizzesQuizItem],
  templateUrl: './quizzes-list.html',
  styleUrl: './quizzes-list.scss',
})
export class QuizzesList {
  public quizzes = input.required<QuizPreview[]>();
  public skeletonCount = input.required<number>();
  public isPending = input.required<boolean>();
  public isFetching = input.required<boolean>();
}
