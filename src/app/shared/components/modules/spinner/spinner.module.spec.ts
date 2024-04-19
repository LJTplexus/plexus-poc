import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroSpinnerComponent } from '../../spinner/hero-spinner.component';

describe('SpinnerModule', () => {
  let component: HeroSpinnerComponent;
  let fixture: ComponentFixture<HeroSpinnerComponent>;
  let spinnerElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroSpinnerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSpinnerComponent);
    component = fixture.componentInstance;
    spinnerElement = fixture.nativeElement.querySelector('.spinner');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
