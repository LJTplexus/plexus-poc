import {
  HttpClient,
  HTTP_INTERCEPTORS,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Observable, of, throwError } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/components/dialog-confirm/dialog-confirm.component';
import { HttpConfirmInterceptor } from './http-confirm.interceptor';

describe('HttpConfirmInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let mockDialog: any;
  let interceptor: HttpConfirmInterceptor;
  let mockHttpHandler: jasmine.SpyObj<HttpHandler>;
  let mockHttpRequest: jasmine.SpyObj<HttpRequest<unknown>>;

  beforeEach(() => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open'], ['afterClosed']);
    mockHttpHandler = jasmine.createSpyObj('HttpHandler', ['handle']);
    mockHttpRequest = jasmine.createSpyObj('HttpRequest', ['clone']);
    mockDialog.open.and.returnValue({
      afterClosed: () => of(true),
    });

    TestBed.configureTestingModule({
      declarations: [ConfirmationDialogComponent],
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        HttpConfirmInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpConfirmInterceptor,
          multi: true,
        },
      ],
    });
    interceptor = new HttpConfirmInterceptor(mockDialog);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should handle DELETE request', (done) => {
    const httpRequest = new HttpRequest(
      'DELETE',
      'http://localhost:3000/heros'
    );
    const next: HttpHandler = {
      handle: (req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> => {
        return of({} as HttpEvent<unknown>);
      },
    } as HttpHandler;

    interceptor.intercept(httpRequest, next).subscribe((event) => {
      expect(event).toBeTruthy();
      done();
    });
  });

  it('should cancel action if user closes confirmation dialog', () => {
    const request = new HttpRequest('DELETE', 'http://localhost:3000/heros');
    const next: any = null;

    mockDialog.open.and.returnValue({
      afterClosed: () => of(false),
    });

    interceptor.intercept(request, next).subscribe(
      () => {},
      (error) => {
        expect(error).toBe('Action canceled');
      }
    );
  });

  it('should handle OK a DELETE request', (done) => {
    const request = new HttpRequest('DELETE', 'http://localhost:3000/heros');
    const next: HttpHandler = {
      handle: (req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> => {
        return of({} as HttpEvent<unknown>);
      },
    } as HttpHandler;

    mockDialog.open.and.returnValue({
      afterClosed: () => of(true),
    });

    interceptor.intercept(request, next).subscribe((event) => {
      expect(event).toBeTruthy();
      done();
    });
  });

  it('should handle GET request without showing dialog', (done) => {
    const httpRequest = new HttpRequest('GET', 'http://localhost:3000/heros');
    const next: HttpHandler = {
      handle: (req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> => {
        return of({} as HttpEvent<unknown>);
      },
    } as HttpHandler;

    interceptor.intercept(httpRequest, next).subscribe((event) => {
      expect(event).toBeTruthy();
      done();
    });
  });
});
