import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroComponentComponent } from './hero-component.component';
import { of, throwError } from 'rxjs';
import { ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/core/api/api.service';
import { HeroList } from 'src/app/shared/model/hero.interface';
import { SpinnerService } from 'src/app/shared/services/spinner.services';
import { HeroCardComponent } from 'src/app/shared/components/card/hero-card.component';
import { HeroHeaderComponent } from 'src/app/shared/components/header/hero-header.component';
import { HeroFilterComponent } from 'src/app/shared/components/filter/hero-filter.component';
import { MaterialModule } from 'src/app/shared/components/modules/material/material.module';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('HeroComponentComponent', () => {
  let component: HeroComponentComponent;
  let fixture: ComponentFixture<HeroComponentComponent>;
  let apiService: ApiService;
  let matDialog: MatDialog;
  let viewContainerRef: ViewContainerRef;
  let spinnerService: SpinnerService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeroComponentComponent,
        HeroCardComponent,
        HeroHeaderComponent,
        HeroFilterComponent,
      ],
      imports: [MaterialModule, HttpClientTestingModule],
      providers: [
        {
          provide: ApiService,
          /* useValue: jasmine.createSpyObj('ApiService', [
            'getHero',
            'getHeroByFilterName',
            'createHero',
            'deleteHero',
          ]), */
        },
        { provide: MatDialog, useValue: {} },
        { provide: MatSnackBar, useValue: {} },
        { provide: ViewContainerRef, useValue: {} },
        { provide: SpinnerService, useValue: {} },
      ],
    });

    fixture = TestBed.createComponent(HeroComponentComponent);
    component = fixture.componentInstance;
    apiService = TestBed.get(ApiService);
    matDialog = TestBed.get(MatDialog);
    viewContainerRef = TestBed.get(ViewContainerRef);
    spinnerService = TestBed.get(SpinnerService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchHero and update heroData', () => {
    const mockHeroData: HeroList[] = [
      {
        id: 1,
        heroName: 'hero',
        description: 'hero',
        company: 'hero',
        canFly: false,
      },
    ];
    spyOn(apiService, 'getHero').and.returnValue(of(mockHeroData));

    component.searchHero();

    expect(apiService.getHero).toHaveBeenCalled();
    expect(component.heroData).toEqual(mockHeroData);
  });

  it('should call searchHeroFilterName and update heroData', () => {
    const mockHeroData: HeroList[] = [
      {
        id: 1,
        heroName: 'hero',
        description: 'hero',
        company: 'hero',
        canFly: false,
      },
    ];
    spyOn(apiService, 'getHeroByFilterName').and.returnValue(of(mockHeroData));

    component.searchHeroFilterName('HeroName');

    expect(apiService.getHeroByFilterName).toHaveBeenCalledWith('HeroName');
    expect(component.heroData).toEqual(mockHeroData);
  });

  it('should call createNewHero and update heroData', () => {
    const mockHeroData: HeroList = {
      id: 1,
      heroName: 'hero',
      description: 'hero',
      company: 'hero',
      canFly: false,
    };
    spyOn(apiService, 'createHero').and.returnValue(of(mockHeroData));
    spyOn(component, 'searchHero');

    component.createNewHero(mockHeroData);

    expect(apiService.createHero).toHaveBeenCalledWith(mockHeroData);
    expect(component.searchHero).toHaveBeenCalled();
  });

  it('should handle error in createNewHero', () => {
    const errorResponse = 'Error creating new hero';
    spyOn(apiService, 'createHero').and.returnValue(throwError(errorResponse));

    component.createNewHero({
      id: 1,
      heroName: 'hero',
      description: 'hero',
      company: 'hero',
      canFly: false,
    });

    expect(apiService.createHero).toHaveBeenCalled();
    expect(snackBarSpy.open).toHaveBeenCalledWith(errorResponse);
  });

  it('should call eventReload and update heroData', () => {
    spyOn(component, 'searchHero');

    component.eventReload();

    expect(component.searchHero).toHaveBeenCalled();
  });

  it('should call deleteHero and update heroData', () => {
    const heroId = 1;
    spyOn(apiService, 'deleteHero').and.returnValue(of(true));
    spyOn(component, 'searchHero');

    component.deleteHero(heroId);

    expect(apiService.deleteHero).toHaveBeenCalledWith(heroId);
    expect(component.searchHero).toHaveBeenCalled();
  });

  it('should handle error in deleteHero', () => {
    const heroId = 1;
    const errorResponse = 'Error deleting hero';
    spyOn(apiService, 'deleteHero').and.returnValue(throwError(errorResponse));

    component.deleteHero(heroId);

    expect(apiService.deleteHero).toHaveBeenCalledWith(heroId);
  });
});
