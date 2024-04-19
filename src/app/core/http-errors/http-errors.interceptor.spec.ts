import {
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HTTP_INTERCEPTORS,
  HttpClient,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { HttpErrorsInterceptor } from './http-errors.interceptor';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('HttpErrorsInterceptor', () => {
  let interceptor: HttpErrorsInterceptor;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let mockSnackBar: any;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [
        { provide: MatSnackBar, useValue: mockSnackBar },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorsInterceptor,
          multi: true,
        },
      ],
    });
    const spy = jasmine.createSpyObj('MatSnackBar', ['open']);
    interceptor = new HttpErrorsInterceptor(spy);
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should pass through the request when no error occurs', (done) => {
    const httpRequest = new HttpRequest('GET', 'http://localhost:3000/heros');
    const next: HttpHandler = {
      handle: (req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> => {
        return of({} as HttpEvent<unknown>);
      },
    } as HttpHandler;

    interceptor.intercept(httpRequest, next).subscribe((event) => {
      expect(event).toBeTruthy();
      expect(snackBarSpy.open).not.toHaveBeenCalled();
      done();
    });
  });

  /*   it('when a request is made the retry interceptor should be called', () => {
    spyOn(HttpErrorsInterceptor.prototype, 'intercept').and.callThrough();

    httpClient.get('/test').subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpTestingController.expectOne('/test');
    req.flush({});

    expect(HttpErrorsInterceptor.prototype.intercept).toHaveBeenCalled();
  }); */
});
