import { MaterialModule } from './material.module';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('MaterialModule ', () => {
  let module: MaterialModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        /*           { },
          { provide: MatDatepickerModule, useFactory: generator.matDatepickerModuleStub() },,
          { provide: MAT_SELECT_SCROLL_STRATEGY } */
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    module = new MaterialModule();
  });

  it('should create module', () => {
    expect(module).toBeTruthy();
  });

  /*     it('should run #scrollFactory', () => {
      const overlay = {} as Overlay;
      expect(scrollFactory(overlay)).toBeTruthy();
    }); */
});
