import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {
  constructor(private _snackBar: MatSnackBar) {}

  private openSnackBar(message: string) {
    this._snackBar.open(`Error. ${message}`, '', { duration: 2000 });
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.openSnackBar(`Message: ${error.message}`);
        return throwError(() => error.message);
      })
    );
  }
}
