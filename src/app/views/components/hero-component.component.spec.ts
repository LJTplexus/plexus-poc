import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroComponent } from './hero-component.component';
import { of } from 'rxjs';
import { ViewContainerRef } from '@angular/core';
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

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;
  let viewContainerRef: ViewContainerRef;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let mockSnackBar: any;
  let apiService: jasmine.SpyObj<ApiService>;
  let spinnerService: jasmine.SpyObj<SpinnerService>;

  const mockHeroData = [
    {
      id: 1,
      heroName: 'hero',
      description: 'hero',
      company: 'hero',
      canFly: false,
    },
  ];

  beforeEach(() => {
    const spySnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    apiService = jasmine.createSpyObj('ApiService', [
      'getHero',
      'getHeroByFilterName',
      'editHero',
      'createHero',
      'deleteHero',
      'searchHero',
    ]);
    spinnerService = jasmine.createSpyObj('SpinnerService', ['show', 'hide']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [
        HeroComponent,
        HeroCardComponent,
        HeroHeaderComponent,
        HeroFilterComponent,
      ],
      imports: [MaterialModule, HttpClientTestingModule],
      providers: [
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: ViewContainerRef, useValue: {} },
      ],
    });

    fixture = TestBed.createComponent(HeroComponent);
    viewContainerRef = TestBed.get(ViewContainerRef);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = new HeroComponent(
      apiService,
      spySnackBar,
      viewContainerRef,
      spinnerService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set hero data on ngOnInit', () => {
    const mockHeroData: HeroList[] = [
      {
        id: 1,
        heroName: 'hero',
        description: 'hero',
        company: 'hero',
        canFly: false,
      },
    ];
    apiService.getHero.and.returnValue(of(mockHeroData));

    component.ngOnInit();

    expect(component.heroData).toEqual(mockHeroData);
  });

  it('should call searchHeroFilterName and update heroData', () => {
    const heroNameFilter = 'hero';

    apiService.getHeroByFilterName.and.returnValue(of(mockHeroData));

    component.searchHeroFilterName(heroNameFilter);

    expect(apiService.getHeroByFilterName).toHaveBeenCalledWith(heroNameFilter);
    expect(component.heroData).toBe(mockHeroData);
  });

  it('should call createNewHero and update heroData', () => {
    const mockNewHeroData: HeroList = {
      id: 1,
      heroName: 'hero',
      description: 'hero',
      company: 'hero',
      canFly: false,
    };

    apiService.createHero.and.returnValue(of(mockNewHeroData));
    apiService.getHero.and.returnValue(of(mockNewHeroData));

    component.createNewHero(mockNewHeroData);

    expect(apiService.createHero).toHaveBeenCalledWith(mockNewHeroData);
  });

  it('should call eventReload and update heroData', () => {
    spyOn(component, 'searchHero');

    apiService.getHero.and.returnValue(of(mockHeroData));
    component.eventReload();

    expect(component.searchHero).toHaveBeenCalled();
  });

  it('should call deleteHero and update heroData', () => {
    const heroId = 1;

    apiService.deleteHero.and.returnValue(of({}));
    apiService.getHero.and.returnValue(of({}));

    component.deleteHero(heroId);

    expect(apiService.deleteHero).toHaveBeenCalledWith(heroId);
  });
});
