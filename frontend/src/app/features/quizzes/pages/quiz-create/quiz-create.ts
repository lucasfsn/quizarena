import { ErrorResponse } from '@/app/core/types/error-response';
import { QuizCreateForm } from '@/app/features/quizzes/components/quiz-create-form/quiz-create-form';
import { getQuizzesQueryKey } from '@/app/features/quizzes/queries/get-quizzes-query-key';
import { Quizzes } from '@/app/features/quizzes/services/quizzes/quizzes';
import { QuizCreatePayload } from '@/app/features/quizzes/types/quiz-create-payload';
import { Toast } from '@/app/shared/services/toast/toast';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  injectMutation,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-quiz-create',
  imports: [QuizCreateForm],
  templateUrl: './quiz-create.html',
  styleUrl: './quiz-create.scss',
})
export class QuizCreate {
  private readonly quizzesService = inject(Quizzes);
  private readonly router = inject(Router);
  private readonly toastService = inject(Toast);
  private readonly queryClient = inject(QueryClient);

  protected query = injectMutation(() => ({
    mutationFn: (data: QuizCreatePayload) =>
      lastValueFrom(this.quizzesService.createQuiz(data)),
    onSuccess: () => {
      this.toastService.success('Quiz created successfully!');
      this.queryClient.invalidateQueries({
        queryKey: getQuizzesQueryKey(),
      });
      this.router.navigate(['/quizzes']);
    },
    onError: (error: ErrorResponse) => this.toastService.error(error.message),
  }));

  protected isLoading(): boolean {
    return this.query.isPending();
  }
}
