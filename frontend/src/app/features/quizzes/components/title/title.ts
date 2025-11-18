import { Component, OnInit, output } from '@angular/core';
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
  public titleChange = output<string | undefined>();

  protected form = new FormControl<string>('');

  public ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      this.titleChange.emit(value || undefined);
    });
  }
}
