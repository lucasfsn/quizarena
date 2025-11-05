import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [MatIconModule, RouterLinkActive, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {}
