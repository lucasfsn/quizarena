import { Component, input } from '@angular/core';
import { ProgressBar as ProgressBarPrimeNg } from 'primeng/progressbar';

@Component({
  selector: 'app-progress-bar',
  imports: [ProgressBarPrimeNg],
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.scss',
})
export class ProgressBar {
  public isLoading = input<boolean>(false);
}
