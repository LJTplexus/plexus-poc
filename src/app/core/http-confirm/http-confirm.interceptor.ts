import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/components/dialog-confirm/dialog-confirm.component';

@Injectable()
export class HttpConfirmInterceptor implements HttpInterceptor {
  constructor(public dialog: MatDialog, public _snackBar: MatSnackBar) {}

  /* intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.method === 'DELETE') {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: { message: '¿Está seguro de que desea realizar esta acción?' },
      });
      return new Observable((observer) => {
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            return next.handle(request).pipe(
              tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse && event.status === 200) {
                  this._snackBar.open(`borrado`, '', { duration: 2000 });
                }
              })
            );
          } else {
            this._snackBar.open(`no borrado`, '', { duration: 2000 });
            return observer.complete();
          }
        });
      });
    } else {
      return next.handle(request).pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && event.status === 200) {
            this._snackBar.open(`borrado`, '', { duration: 2000 });
          }
        })
      );
    }
  } */

  /* intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.method === 'DELETE') {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: { message: '¿Está seguro de que desea realizar esta acción?' },
      });
      return new Observable((observer) => {
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            return next.handle(request).pipe(
              tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse && event.status === 200) {
                  this._snackBar.open(`borrado`, '', { duration: 2000 });
                }
              })
            );
          } else {
            return observer.complete();
          }
        });
      });
    } else {
      return next.handle(request).pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && event.status === 200) {
            this._snackBar.open(`get`, '', { duration: 2000 });
          }
        })
      );
    }
  } */

  /*   intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.method === 'DELETE') {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: { message: '¿Está seguro de que desea realizar esta acción?' },
      });
      return new Observable((observer) => {
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            observer.next(result);
          } else {
            observer.complete();
          }
        });
      });
    }
    return new Observable((observer) => {
      observer.next();
    });
  } */

  /*   intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const header = '';
    if (request.method === 'DELETE') {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: { message: '¿Está seguro de que desea realizar esta acción?' },
      });
      return new Observable((observer) => {
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this._snackBar.open(`borrado`, '', { duration: 2000 });
            request = request.clone({
              headers: request.headers.set('Authorization', header),
            });
            next.handle(request);
            observer.complete();
          } else {
            this._snackBar.open(`NO borrado`, '', { duration: 2000 });
            observer.complete();
          }
        });
      });
    }
    return next.handle(request);
  } */

  //FUNCIONA
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    /*     const header = '';
    if (request.method === 'DELETE') {
      request = request.clone({
        headers: request.headers.set('Authorization', header),
      });
    } */
    return next.handle(request);
  }
}
