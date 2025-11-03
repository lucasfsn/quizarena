import { NotFoundImage } from '@/app/shared/components/svg/not-found-image/not-found-image';
import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  imports: [NotFoundImage],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound {}
