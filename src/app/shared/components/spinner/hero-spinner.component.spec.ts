import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroSpinnerComponent } from './hero-spinner.component';

describe('HeroSpinnerComponent', () => {
  let component: HeroSpinnerComponent;
  let fixture: ComponentFixture<HeroSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroSpinnerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize status as true', () => {
    expect(component.status).toBeTrue();
  });

  it('should emit actionButton event with true when statusStep is called with true', () => {
    spyOn(component.actionButton, 'emit');
    component.statusStep(true);
    expect(component.actionButton.emit).toHaveBeenCalledWith(true);
  });

  it('should emit actionButton event with false when statusStep is called with false', () => {
    spyOn(component.actionButton, 'emit');
    component.statusStep(false);
    expect(component.actionButton.emit).toHaveBeenCalledWith(false);
  });

  it('should return true when showSpinner is called', () => {
    expect(component.showSpinner()).toBeTrue();
  });

  describe('when next input is set', () => {
    it('should update status to true when next input is true', () => {
      component.next = true;
      expect(component.status).toBeTrue();
    });

    it('should update status to false when next input is false', () => {
      component.next = false;
      expect(component.status).toBeFalse();
    });
  });
});
