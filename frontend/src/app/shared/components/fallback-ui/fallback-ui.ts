import { Button } from '@/app/shared/components/button/button';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-fallback-ui',
  imports: [Button],
  templateUrl: './fallback-ui.html',
  styleUrl: './fallback-ui.scss',
})
export class FallbackUi {
  public title = input.required<string>();
  public description = input.required<string>();
  public redirectTo = input<string | null>(null);
}
