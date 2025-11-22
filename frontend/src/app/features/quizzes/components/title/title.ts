import { QuizFilters } from '@/app/features/quizzes/services/quiz-filters/quiz-filters';
import { Component, effect, inject, input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-title',
  imports: [ReactiveFormsModule, InputGroup, InputGroupAddon, FloatLabel, InputText],
  templateUrl: './title.html',
  styleUrl: './title.scss',
})
export class Title implements OnInit {
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
      this.quizFiltersService.setTitle(value || undefined);
    });
  }
}
