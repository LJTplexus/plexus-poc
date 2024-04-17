import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { throwError } from 'rxjs';

import { BoToastService } from '@hotelbeds-com/common-back-components-ui-lib';

import { HttpErrorsInterceptor } from './http-errors.interceptor';
import { MockBoToastService } from '../../../../../mocks/bo-services/mock-bo-toast-service';

describe('RequestsInterceptor', () => {
  const mockBoToastService = new MockBoToastService();
  let interceptor: HttpErrorsInterceptor;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpErrorsInterceptor,
        { provide: BoToastService, useValue: mockBoToastService },
      ],
    });
    interceptor = TestBed.inject(HttpErrorsInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should call boToastService.error() with message if it`s ErrorEvent', fakeAsync(() => {
    // Arrange
    const boToastSpy = jest.spyOn(mockBoToastService, 'error');

    const errorExpected = new Error();
    const errorEventExpected = new ErrorEvent('CORS', {
      message: 'ErrorEvent error',
    });
    (errorExpected as any).error = errorEventExpected;
    // Act Assert
    try {
      interceptor
        .intercept({} as any, {
          handle: () => throwError(() => errorExpected),
        })
        .subscribe();
      flush();
    } catch (error) {
      expect(boToastSpy).toHaveBeenCalledWith({
        title: 'Error',
        message: 'Error occurred. Message: ErrorEvent error',
      });
    }
  }));
  it('should call boToastService.error() with error_description if it`s ErrorEvent', fakeAsync(() => {
    // Arrange
    const boToastSpy = jest.spyOn(mockBoToastService, 'error');

    const errorExpected = new Error();
    const errorEventExpected = {
      error_description: 'ErrorEvent error',
    };
    (errorExpected as any).error = errorEventExpected;
    // Act Assert
    try {
      interceptor
        .intercept({} as any, {
          handle: () => throwError(() => errorExpected),
        })
        .subscribe();
      flush();
    } catch (error) {
      expect(boToastSpy).toHaveBeenCalledWith({
        title: 'Error',
        message: 'Error occurred. Message: ErrorEvent error',
      });
    }
  }));
  it('should call boToastService with appropriate information when it`s server error', fakeAsync(() => {
    // Arrange
    const boToastSpy = jest.spyOn(mockBoToastService, 'error');
    const errorExpected = new Error('Usual error');

    // Act Assert
    try {
      interceptor
        .intercept({} as any, {
          handle: () => throwError(() => errorExpected),
        })
        .subscribe();
      flush();
    } catch (error) {
      expect(boToastSpy).toHaveBeenCalledWith({
        title: 'Error',
        message: 'Error occurred. Message: Usual error',
      });
    }
  }));
});
