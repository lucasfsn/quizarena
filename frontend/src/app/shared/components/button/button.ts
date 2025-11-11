import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

type Variant = 'primary' | 'secondary';
type Size = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  imports: [CommonModule, RouterLink],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  @Input({ required: true }) public variant!: Variant;
  @Input({ required: true }) public size!: Size;
  @Input() public disabled: boolean = false;
  @Input() public customClasses: string = '';
  @Input() public redirectTo?: string;
  @Output() public handleClick = new EventEmitter<void>();

  protected get classes(): string[] {
    const base = [
      'focus-ring',
      'flex',
      'items-center',
      'justify-center',
      'rounded-full',
      'transition-colors',
      'active:ring-0',
    ];

    const sizes: Record<Size, string[]> = {
      sm: ['text-xs', 'px-2.5', 'py-1'],
      md: ['text-sm', 'px-3', 'py-1.5'],
      lg: ['text-base', 'px-3.5', 'py-2'],
    };

    const variants: Record<Variant, string[]> = {
      primary: ['bg-accent', 'text-on-accent', 'hover:opacity-95', 'active:opacity-90'],
      secondary: ['bg-surface', 'text-primary', 'hover:opacity-95', 'active:opacity-90'],
    };
    const variantClasses = this.disabled
      ? ['bg-gray-300', 'text-gray-500', 'opacity-80', 'cursor-not-allowed']
      : [...variants[this.variant], 'cursor-pointer'];

    const custom = this.customClasses ? this.customClasses.split(/\s+/).filter(Boolean) : [];

    return [...base, ...sizes[this.size], ...variantClasses, ...custom];
  }

  protected onClick(): void {
    if (this.disabled) return;

    this.handleClick.emit();
  }
}
