import { ComponentFixture, waitForAsync, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/api/api.service';
import { HeroDialogComponent } from './hero-dialog.component';
import { MaterialModule } from '../modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { HeroList } from '../../model/hero.interface';

describe('HeroDialogComponent', () => {
  let component: HeroDialogComponent;
  let fixture: ComponentFixture<HeroDialogComponent>;
  let matDialogRefMock: jasmine.SpyObj<MatDialogRef<HeroDialogComponent>>;
  let apiServiceMock: jasmine.SpyObj<ApiService>;
  const mockHeroData: HeroList = {
    id: 1,
    heroName: 'MockHero',
    description: 'MockDescription',
    company: 'MockCompany',
    canFly: false,
  };

  beforeEach(waitForAsync(() => {
    const matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    const apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getHeroByFilterId',
    ]);

    TestBed.configureTestingModule({
      declarations: [HeroDialogComponent],
      imports: [ReactiveFormsModule, MaterialModule, BrowserAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        { provide: ApiService, useValue: apiServiceSpy },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroDialogComponent);
    component = fixture.componentInstance;
    matDialogRefMock = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<HeroDialogComponent>
    >;
    apiServiceMock = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedHero when data.id is defined', () => {
    apiServiceMock.getHeroByFilterId.and.returnValue(of(mockHeroData));

    expect(component.selectedHero.id).toBe(0);
    component = new HeroDialogComponent(
      matDialogRefMock,
      mockHeroData,
      new FormBuilder(),
      apiServiceMock
    );
    expect(component.selectedHero).toEqual(mockHeroData);
  });

  it('should initialize form with default values', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('frm_heroName')).toBeTruthy();
    expect(component.form.get('frm_description')).toBeTruthy();
    expect(component.form.get('frm_company')).toBeTruthy();
    expect(component.form.get('frm_canFly')).toBeTruthy();
  });

  it('should call closeClick and close the dialog', () => {
    component.closeClick();
    expect(matDialogRefMock.close).toHaveBeenCalledWith(false);
  });

  it('should submit the form and close the dialog with selectedHero', () => {
    component.selectedHero = mockHeroData;
    component.onSubmit();
    expect(matDialogRefMock.close).toHaveBeenCalledWith(mockHeroData);
  });

  it('should validate form fields', () => {
    const heroNameControl = component.form.get('frm_heroName');
    const descriptionControl = component.form.get('frm_description');
    const companyControl = component.form.get('frm_company');
    const canFlyControl = component.form.get('frm_canFly');

    heroNameControl?.setValue('Superman');
    descriptionControl?.setValue('Man of Steel');
    companyControl?.setValue('DC');
    canFlyControl?.setValue(true);

    expect(component.form.valid).toBeTrue();
  });

  it('should handle form submission when form is invalid', () => {
    const heroNameControl = component.form.get('frm_heroName');
    heroNameControl?.setValue(
      'This is a very long hero name that exceeds the maximum character limit allowed'
    );
    component.onSubmit();
    expect(matDialogRefMock.close).toHaveBeenCalled();
  });
});
