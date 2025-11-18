import { Component, OnInit, output } from '@angular/core';
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
  public authorChange = output<string | undefined>();

  protected form = new FormControl<string>('');

  public ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      this.authorChange.emit(value || undefined);
    });
  }
}
