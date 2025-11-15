import { Button } from '@/app/shared/components/button/button';
import { afterNextRender, Component, EventEmitter, Output, signal } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-user-button',
  imports: [Button, Skeleton],
  templateUrl: './user-button.html',
  styleUrl: './user-button.scss',
})
export class UserButton {
  protected readonly isLoggedIn = signal<boolean>(false);
  protected readonly isLoading = signal<boolean>(true);

  @Output() public handleClick = new EventEmitter<MouseEvent>();

  public constructor() {
    afterNextRender(() => {
      // TODO: Temporary user login logic; replace with real auth logic later
      setTimeout(() => {
        this.isLoggedIn.set(true);
        this.isLoading.set(false);
      }, 1000);
    });
  }

  protected onClick(event: MouseEvent): void {
    this.handleClick.emit(event);
  }
}
