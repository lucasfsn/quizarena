import { Component } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-quiz-skeleton',
  imports: [Skeleton],
  templateUrl: './quiz-skeleton.html',
  styleUrl: './quiz-skeleton.scss',
})
export class QuizSkeleton {}
