import { MOCK_QUIZZES } from '@/app/dev/quiz-list';
import { Quiz } from '@/app/features/quizzes/components/quiz/quiz';
import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  imports: [Quiz],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  // Mock data
  protected readonly quizzes = MOCK_QUIZZES;
}
