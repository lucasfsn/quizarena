import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

type ToastSeverity = 'success' | 'info' | 'warn' | 'error';

interface ToastOptions {
  severity: ToastSeverity;
  summary: string;
  detail: string;
}

@Injectable({
  providedIn: 'root'
})
export class Toast {
  protected messageService = inject(MessageService);

  public show(options: ToastOptions): void {
    this.messageService.add({
      ...options,
      life: 3000, // life of 3 seconds
      sticky: false // will disappear automatically
    });
  }

  public success(detail: string, summary: string = "Success"): void {
    this.show({
      severity: 'success',
      summary,
      detail,
    });
  }

  public error(detail: string, summary: string = "Error"): void {
    this.show({
      severity: 'error',
      summary,
      detail,
    });
  }

  public warn(detail: string, summary: string = "Warn"): void {
    this.show({
      severity: 'warn',
      summary,
      detail,
    });
  }

  public info(detail: string, summary: string = "Info"): void {
    this.show({
      severity: 'info',
      summary,
      detail,
    });
  }
}
