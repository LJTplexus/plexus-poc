import {
  HttpClient,
  HTTP_INTERCEPTORS,
  HttpRequest,
} from '@angular/common/http';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/components/dialog-confirm/dialog-confirm.component';
import { HttpConfirmInterceptor } from './http-confirm.interceptor';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('HttpConfirmInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let dialog: MatDialog;
  let mockSnackBar: any;
  let interceptor: HttpConfirmInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [
        { provide: MatSnackBar, useValue: mockSnackBar },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpConfirmInterceptor,
          multi: true,
        },
      ],
    });
    const spyDialog = jasmine.createSpyObj('MatDialog', ['open']);
    const spySnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    interceptor = new HttpConfirmInterceptor(spyDialog, spySnackBar);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    dialog = TestBed.inject(MatDialog);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should intercept DELETE requests and display confirmation dialog', () => {
    spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => ({ pipe: () => {} }),
    } as any);

    httpClient.delete('http://localhost:3000/heros').subscribe();

    expect(dialog.open).toHaveBeenCalledWith(ConfirmationDialogComponent, {
      width: '500px',
      height: '200px',
      data: { message: '¿Are you sure to delete?' },
    });
  });

  it('should throw an error if user cancels the action', fakeAsync(() => {
    const request = new HttpRequest('DELETE', 'http://localhost:3000/heros');
    spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => ({ pipe: () => throwError('Action canceled') }),
    } as any);

    httpClient.delete('http://localhost:3000/heros').subscribe(
      () => fail('Should have thrown an error'),
      (error) => expect(error).toBe('Action canceled')
    );
    tick();
  }));

  it('should handle unexpected errors', fakeAsync(() => {
    const request = new HttpRequest('DELETE', 'http://localhost:3000/heros');
    const error = new Error('Internal server error');
    spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => ({ pipe: () => throwError(error) }),
    } as any);

    httpClient.delete('http://localhost:3000/heros').subscribe(
      () => fail('Should have thrown an error'),
      (err) => expect(err).toBe(error)
    );
    tick();
  }));
});
