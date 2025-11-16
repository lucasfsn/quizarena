import { Filters } from '@/app/features/quizzes/components/filters/filters';
import { List } from '@/app/features/quizzes/components/list/list';
import { Component } from '@angular/core';

@Component({
  selector: 'app-quizzes',
  imports: [Filters, List],
  templateUrl: './quizzes.html',
  styleUrl: './quizzes.scss',
})
export class Quizzes {}
