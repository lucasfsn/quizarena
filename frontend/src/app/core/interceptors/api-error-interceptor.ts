import { ErrorResponse } from '@/app/core/types/error-response';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

// eslint-disable-next-line complexity
function mapHttpError(error: HttpErrorResponse): ErrorResponse {
  return {
    code: error.error?.code ?? error.status,
    message: error.error?.message ?? error.message,
    timestamp: error.error?.timestamp ?? new Date().toISOString(),
    data: error.error?.data ?? null,
  };
}

export const apiErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        const errorResponse: ErrorResponse = mapHttpError(error);

        return throwError(() => errorResponse);
      }

      return throwError(() => error);
    })
  );
};
