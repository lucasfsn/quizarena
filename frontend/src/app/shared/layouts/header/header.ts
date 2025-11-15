import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PopoverModule } from 'primeng/popover';

@Component({
  selector: 'app-header',
  imports: [RouterLink, PopoverModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected onLogout(): void {
    // TODO: Implement logout logic here
  }
}
