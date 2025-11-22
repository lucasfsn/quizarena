import { FallbackUi } from '@/app/shared/components/fallback-ui/fallback-ui';
import { NotFoundImage } from '@/app/shared/components/svg/not-found-image';
import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  imports: [NotFoundImage, FallbackUi],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound {}
