import {
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, throwError } from 'rxjs';
import { HttpErrorsInterceptor } from './http-errors.interceptor';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MaterialModule } from 'src/app/shared/components/modules/material/material.module';

describe('HttpErrorsInterceptor', () => {
  let interceptor: HttpErrorsInterceptor;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let httpTestingController: HttpTestingController;
  let mockHttpHandler: jasmine.SpyObj<HttpHandler>;
  let mockHttpRequest: jasmine.SpyObj<HttpRequest<unknown>>;

  beforeEach(() => {
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockHttpHandler = jasmine.createSpyObj('HttpHandler', ['handle']);
    mockHttpRequest = jasmine.createSpyObj('HttpRequest', ['clone']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MaterialModule],
      providers: [
        { provide: MatSnackBar, useValue: mockSnackBar },
        HttpErrorsInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorsInterceptor,
          multi: true,
        },
      ],
    });

    interceptor = new HttpErrorsInterceptor(mockSnackBar);
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

  it('should open snackbar and return error message', (done) => {
    const statusMessageError = 'Error TEXT';
    const errorResponse = new HttpErrorResponse({
      statusText: statusMessageError,
    });

    mockSnackBar.open.and.stub();

    const result = interceptor.intercept(new HttpRequest('GET', 'test'), {
      handle: () => throwError(errorResponse),
    });

    result.subscribe(
      () => {},
      (error) => {
        expect(mockSnackBar.open).toHaveBeenCalledWith(`Error: ${error}`, '', {
          duration: 2000,
        });
        done();
      }
    );
  });
});
