import { Button } from '@/app/shared/components/button/button';
import { FallbackUiImage } from '@/app/shared/components/svg/fallback-ui-image';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-fallback-ui',
  imports: [Button, FallbackUiImage],
  templateUrl: './fallback-ui.html',
  styleUrl: './fallback-ui.scss',
})
export class FallbackUi {
  public redirectTo = input<string>('/');
}
