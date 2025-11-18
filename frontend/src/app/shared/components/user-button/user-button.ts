import { Button } from '@/app/shared/components/button/button';
import { Component, output, signal } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-user-button',
  imports: [Button, Skeleton],
  templateUrl: './user-button.html',
  styleUrl: './user-button.scss',
})
export class UserButton {
  protected readonly isLoggedIn = signal<boolean>(true);
  protected readonly isLoading = signal<boolean>(false);
  public handleClick = output<MouseEvent>();

  protected onClick(event: MouseEvent): void {
    this.handleClick.emit(event);
  }
}
