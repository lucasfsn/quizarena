import { QuizCreateForm } from '@/app/features/quizzes/components/quiz-create-form/quiz-create-form';
import { Quizzes } from '@/app/features/quizzes/services/quizzes/quizzes';
import { QuizCreatePayload } from '@/app/features/quizzes/types/quiz-create-payload';
import { QuizPreview } from '@/app/features/quizzes/types/quiz-preview';
import { Toast } from '@/app/shared/services/toast/toast';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-quiz-create',
  imports: [QuizCreateForm],
  templateUrl: './quiz-create.html',
  styleUrl: './quiz-create.scss',
})
export class QuizCreate {
  private quizzesService = inject(Quizzes);
  private router = inject(Router);
  private toastService = inject(Toast);

  protected query = injectMutation(() => ({
    mutationFn: (data: QuizCreatePayload) =>
      lastValueFrom(this.quizzesService.createQuiz(data)),
    onSuccess: (res: QuizPreview) => {
      this.toastService.success('Quiz created successfully!');
      this.router.navigate(['/quizzes', res.id]);
    },
    onError: () =>
      this.toastService.error('Failed to create quiz. Please try again.'),
  }));

  protected isLoading(): boolean {
    return this.query.isPending();
  }
}
