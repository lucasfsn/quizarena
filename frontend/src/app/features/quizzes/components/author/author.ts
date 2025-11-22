import { QuizFilters } from '@/app/features/quizzes/services/quiz-filters/quiz-filters';
import { Component, effect, inject, input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-author',
  imports: [InputText, FloatLabel, ReactiveFormsModule],
  templateUrl: './author.html',
  styleUrl: './author.scss',
})
export class Author implements OnInit {
  protected quizFiltersService = inject(QuizFilters);
  public disabled = input.required<boolean>();

  public constructor() {
    effect(() => {
      if (this.disabled()) this.form.disable({ emitEvent: false });
      else this.form.enable({ emitEvent: false });
    });
  }

  protected form = new FormControl<string>('');

  public ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      this.quizFiltersService.setAuthor(value || undefined);
    });
  }
}
