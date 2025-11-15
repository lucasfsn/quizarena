import { UserButton } from '@/app/shared/components/user-button/user-button';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PopoverModule } from 'primeng/popover';

@Component({
  selector: 'app-header',
  imports: [RouterLink, PopoverModule, UserButton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected onLogout(): void {
    // TODO: Implement logout logic here
  }
}
