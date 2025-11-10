import { LoggedOut } from '@/app/features/home/components/logged-out/logged-out';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [LoggedOut],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
