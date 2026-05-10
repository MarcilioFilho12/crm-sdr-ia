import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const apiErrorInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const message =
        typeof error.error === 'string'
          ? error.error
          : (error.error?.message as string | undefined) ?? error.message ?? 'Erro na requisição';
      return throwError(() => new Error(message));
    }),
  );
