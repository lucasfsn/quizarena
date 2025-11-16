import { Component, OnInit } from '@angular/core';
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
  protected form = new FormControl<string>('');

  public ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }
}
