import { HomeContent } from '@/app/features/home/components/home-content/home-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [HomeContent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
