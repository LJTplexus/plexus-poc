import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/components/dialog-confirm/dialog-confirm.component';
@Injectable()
export class HttpConfirmInterceptor implements HttpInterceptor {
  constructor(public dialog: MatDialog, public _snackBar: MatSnackBar) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.method === 'DELETE') {
      return this.showConfirmationDialog(request, next);
    } else {
      return next.handle(request);
    }
  }

  private showConfirmationDialog(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      height: '200px',
      data: { message: '¿Are you sure to delete?' },
    });

    return dialogRef.afterClosed().pipe(
      switchMap((result: boolean) => {
        if (result) {
          return next.handle(request);
        } else {
          return throwError('Action canceled');
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
