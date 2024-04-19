import { TestBed, getTestBed } from '@angular/core/testing';
import { tap, forkJoin } from 'rxjs';
import { HeroSpinnerComponent } from '../components/spinner/hero-spinner.component';
import { SpinnerService } from './spinner.services';

describe('SpinnerService', () => {
  let injector: TestBed;
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpinnerService],
      declarations: [HeroSpinnerComponent],
    });

    injector = getTestBed();
    service = injector.inject(SpinnerService);
  });

  it('should show spinner without providing a view container reference', (done) => {
    service.show().subscribe((result) => {
      expect(result).toBe(null);
      done();
    });
  });

  it('should hide spinner without providing a view container reference', (done) => {
    service.hide().subscribe((result) => {
      expect(result).toBe(null);
      done();
    });
  });

  it('should return observable with correct values when showing and hiding spinner', (done) => {
    const showObservable = service.show().pipe(
      tap((result) => {
        expect(result).toBe(null);
      })
    );

    const hideObservable = service.hide().pipe(
      tap((result) => {
        expect(result).toBe(null);
      })
    );

    forkJoin([showObservable, hideObservable]).subscribe(() => {
      done();
    });
  });
});
