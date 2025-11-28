import { QuizFilters } from '@/app/features/quizzes/services/quiz-filters/quiz-filters';
import { Component, DestroyRef, effect, inject, input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { InputText } from 'primeng/inputtext';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-quizzes-filters-title',
  imports: [ReactiveFormsModule, InputGroup, InputGroupAddon, FloatLabel, InputText],
  templateUrl: './quizzes-filters-title.html',
  styleUrl: './quizzes-filters-title.scss',
})
export class QuizzesFiltersTitle implements OnInit {
  private destroyRef = inject(DestroyRef);
  public disabled = input.required<boolean>();

  private quizFiltersService = inject(QuizFilters);

  public constructor() {
    effect(() => {
      if (this.disabled()) this.form.disable({ emitEvent: false });
      else this.form.enable({ emitEvent: false });
    });
  }

  protected form = new FormControl<string>('');

  public ngOnInit(): void {
    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      this.quizFiltersService.setTitle(value || undefined);
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
