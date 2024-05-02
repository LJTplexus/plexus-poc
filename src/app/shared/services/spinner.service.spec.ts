import { ViewContainerRef, ComponentRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { forkJoin, tap } from 'rxjs';
import { HeroSpinnerComponent } from '../components/spinner/hero-spinner.component';
import { SpinnerService } from './spinner.services';

describe('SpinnerService', () => {
  let service: SpinnerService;
  let viewContainerRefMock: jasmine.SpyObj<ViewContainerRef>;
  let componentRefMock: jasmine.SpyObj<ComponentRef<HeroSpinnerComponent>>;
  let viewContainerRef: ViewContainerRef;

  beforeEach(() => {
    const viewContainerRefSpy = jasmine.createSpyObj('ViewContainerRef', [
      'createComponent',
    ]);
    const componentRefSpy = jasmine.createSpyObj('ComponentRef', ['destroy']);
    viewContainerRef = jasmine.createSpyObj('ViewContainerRef', [
      'createComponent',
    ]);

    TestBed.configureTestingModule({
      providers: [
        SpinnerService,
        { provide: ViewContainerRef, useValue: viewContainerRefSpy },
      ],
    });
    service = TestBed.inject(SpinnerService);
    viewContainerRefMock = TestBed.inject(
      ViewContainerRef
    ) as jasmine.SpyObj<ViewContainerRef>;
    componentRefMock = componentRefSpy as jasmine.SpyObj<
      ComponentRef<HeroSpinnerComponent>
    >;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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
  it('should show spinner when _ref is not undefined', () => {
    const componentRef = jasmine.createSpyObj('ComponentRef', ['instance']);
    service['_ref'] = componentRef;

    const result = service.show(viewContainerRef);

    expect(service['_ref']).toBeTruthy();
  });

  it('should hide spinner when _ref is not undefined', () => {
    const componentRef = jasmine.createSpyObj('ComponentRef', ['destroy']);
    service['_ref'] = componentRef;

    const result = service.hide(viewContainerRef);

    expect(componentRef.destroy).toHaveBeenCalled();
    expect(service['_ref']).toBeUndefined();
  });
});
