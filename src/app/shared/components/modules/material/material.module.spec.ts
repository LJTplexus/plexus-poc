import { TestBed } from '@angular/core/testing';
import { MaterialModule } from './material.module';

describe('MaterialModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
    }).compileComponents();
  });

  it('should import all the required Angular Material modules', () => {
    const materialModule = TestBed.inject(MaterialModule);
    expect(materialModule).toBeTruthy();
  });
});
