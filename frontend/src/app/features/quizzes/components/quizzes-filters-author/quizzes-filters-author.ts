import { QuizFilters } from '@/app/features/quizzes/services/quiz-filters/quiz-filters';
import {
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-quizzes-filters-author',
  imports: [InputText, FloatLabel, ReactiveFormsModule],
  templateUrl: './quizzes-filters-author.html',
  styleUrl: './quizzes-filters-author.scss',
})
export class QuizzesFiltersAuthor implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly quizFiltersService = inject(QuizFilters);

  public disabled = input.required<boolean>();

  public constructor() {
    effect(() => {
      if (this.disabled()) this.form.disable({ emitEvent: false });
      else this.form.enable({ emitEvent: false });
    });
  }

  protected form = new FormControl<string>('');

  public ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((value) => {
        this.quizFiltersService.setAuthor(value ?? undefined);
      });
  }
}
