import { Button } from '@/app/shared/components/button/button';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-user-button',
  imports: [SkeletonModule, Button],
  templateUrl: './user-button.html',
  styleUrl: './user-button.scss',
})
export class UserButton {
  // Temporary mock for user login state; replace with real auth logic (initially null)
  protected readonly isLoggedIn = signal<boolean | null>(null);

  @Output() public handleClick = new EventEmitter<MouseEvent>();

  protected onClick(event: MouseEvent): void {
    this.handleClick.emit(event);
  }
}
