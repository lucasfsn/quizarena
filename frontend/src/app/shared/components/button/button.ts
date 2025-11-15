import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Skeleton } from 'primeng/skeleton';

type Variant = 'primary' | 'secondary' | 'skeleton';
type Size = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  imports: [CommonModule, RouterLink, Skeleton],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  @Input({ required: true }) public variant!: Variant;
  @Input({ required: true }) public size!: Size;
  @Input() public skeletonWidth: string = '8rem';
  @Input() public disabled: boolean = false;
  @Input() public customClasses: string = '';
  @Input() public redirectTo: string | null = null;
  @Output() public handleClick = new EventEmitter<void>();

  protected get skeletonHeight(): string {
    switch (this.size) {
      case 'sm':
        return '1.5rem';
      case 'md':
        return '2rem';
      case 'lg':
        return '2.5rem';
    }
  }

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

    const variants: Record<Exclude<Variant, 'skeleton'>, string[]> = {
      primary: ['bg-accent', 'text-on-accent', 'hover:opacity-95', 'active:opacity-90'],
      secondary: ['bg-surface', 'text-primary', 'hover:opacity-95', 'active:opacity-90'],
    };

    const variantClasses = this.disabled
      ? ['bg-gray-300', 'text-gray-500', 'opacity-80', 'cursor-not-allowed']
      : [...variants[this.variant as Exclude<Variant, 'skeleton'>], 'cursor-pointer'];

    const custom = this.customClasses ? this.customClasses.split(/\s+/).filter(Boolean) : [];

    return [...base, ...sizes[this.size], ...variantClasses, ...custom];
  }

  protected onClick(): void {
    if (this.redirectTo !== null || this.disabled) return;

    this.handleClick.emit();
  }
}
