import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  providers: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
