import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewContainerRef } from '@angular/core';
import { of } from 'rxjs';
import { ApiService } from 'src/app/core/api/api.service';
import { HeroList } from '../../model/hero.interface';
import { SpinnerService } from '../../services/spinner.services';
import { HeroCardComponent } from './hero-card.component';

describe('HeroCardComponent', () => {
  let component: HeroCardComponent;
  let fixture: ComponentFixture<HeroCardComponent>;
  let mockDialog: any;
  let mockSnackBar: any;
  let mockApiService: any;
  let mockViewContainerRef: any;
  let mockSpinnerService: any;

  beforeEach(() => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockApiService = jasmine.createSpyObj('ApiService', ['editHero']);
    mockViewContainerRef = {} as ViewContainerRef;
    mockSpinnerService = jasmine.createSpyObj('SpinnerService', [
      'show',
      'hide',
    ]);

    TestBed.configureTestingModule({
      declarations: [HeroCardComponent],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: ApiService, useValue: mockApiService },
        { provide: ViewContainerRef, useValue: mockViewContainerRef },
        { provide: SpinnerService, useValue: mockSpinnerService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroCardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit heroDataModifyEvent when editHero is called', () => {
    const mockHeroData: HeroList = {
      id: 1,
      heroName: 'Test Hero',
      description: 'Test Description',
      company: 'Test Company',
      canFly: true,
    };
    component.heroData = [mockHeroData];
    const modifiedHeroData: HeroList = {
      ...mockHeroData,
      description: 'Modified Description',
    };
    mockDialog.open.and.returnValue({
      afterClosed: () => of(modifiedHeroData),
    });

    component.editHero(1);

    expect(component.heroDataModifyEvent.emit).toHaveBeenCalledWith(
      modifiedHeroData
    );
  });

  it('should emit heroDataDeleteEvent when deleteHero is called', () => {
    const heroId = 1;
    component.deleteHero(heroId);

    expect(component.heroDataDeleteEvent.emit).toHaveBeenCalledWith(heroId);
  });
});
