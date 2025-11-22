import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-title',
  imports: [InputText, FloatLabel, ReactiveFormsModule],
  templateUrl: './title.html',
  styleUrl: './title.scss',
})
export class Title {
  public control = input.required<FormControl<string | null>>();
}
