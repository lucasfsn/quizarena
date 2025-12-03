import { Button } from '@/app/shared/components/button/button';
import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-user-button',
  imports: [Button],
  templateUrl: './user-button.html',
  styleUrl: './user-button.scss',
})
export class UserButton {
  protected readonly isLoggedIn = signal<boolean>(true);
  public handleClick = output<MouseEvent>();

  protected onClick(event: MouseEvent): void {
    this.handleClick.emit(event);
  }
}
