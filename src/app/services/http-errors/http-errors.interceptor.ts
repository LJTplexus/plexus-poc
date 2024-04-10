import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, from, map, tap, throwError } from 'rxjs';

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {
  constructor(private _snackBar: MatSnackBar) {}

  private openSnackBar(message: string) {
    this._snackBar.open(`Error. ${message}`);
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Blob) {
          from(error.error.text())
            .pipe(
              map((stringifyError) => JSON.parse(stringifyError)),
              tap((parseError) => this.openSnackBar(parseError.message))
            )
            .subscribe();
          return throwError(() => error);
        }
        let errorMessage = error.message;
        if (error.error) {
          errorMessage = error.error.message || error.error.error_description;
        }
        this.openSnackBar(`Message: ${errorMessage}`);
        return throwError(() => error);
      })
    );
  }
}
