import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HeroComponent } from './hero-component.component';
import { Observable, delay, of } from 'rxjs';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MockApiService,
  MockSnackBar,
  MockSpinnerService,
} from '../../shared/services/mock.service';

describe('HeroComponent', () => {
  const apiServiceMock = new MockApiService();
  const spinnerServiceMock = new MockSpinnerService();
  const snackBarMock = new MockSnackBar();
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;
  let viewContainerRef: ViewContainerRef;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let apiService: jasmine.SpyObj<ApiService>;
  let spinnerService: SpinnerService;

  const mockHero = {
    id: 1,
    heroName: 'hero',
    description: 'hero',
    company: 'hero',
    canFly: false,
  };

  const mockHeroData: HeroList[] = [
    {
      id: 1,
      heroName: 'Batman',
      description: 'hero',
      company: 'hero',
      canFly: false,
    },
  ];

  beforeEach(waitForAsync(() => {
    const mockSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    const spinnerServiceSpy = jasmine.createSpyObj('SpinnerService', [
      'show',
      'hide',
    ]);
    const apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getHero',
      'getHeroByFilterName',
      'editHero',
      'createHero',
      'deleteHero',
      'searchHero',
    ]);

    TestBed.configureTestingModule({
      declarations: [
        HeroComponent,
        HeroCardComponent,
        HeroHeaderComponent,
        HeroFilterComponent,
      ],
      imports: [
        MaterialModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        ViewContainerRef,
        { provide: ApiService, useValue: apiServiceMock },
        { provide: MatSnackBar, useValue: snackBarMock },
        { provide: SpinnerService, useValue: spinnerServiceMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    viewContainerRef = TestBed.inject(ViewContainerRef);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setHeroCard method on ngOnInit', (done) => {
    const apiSpy = spyOn<any>(apiServiceMock, 'getHero')
      .and.returnValue(of(mockHeroData))
      .and.callThrough();

    const componentSpy = spyOn(component, 'searchHero').and.callThrough();
    apiServiceMock
      .getHero()
      .pipe(delay(1000))
      .subscribe((data: any) => {
        expect(data).not.toBeUndefined();
        done();
      });

    component.ngOnInit();
    expect(componentSpy).toHaveBeenCalled();
    expect(apiSpy).toHaveBeenCalled();
  });

  it('should call searchHeroFilterName and update heroData', () => {
    const heroNameFilter = 'hero';

    const apiSpy = spyOn<any>(apiServiceMock, 'getHeroByFilterName')
      .and.returnValue(of(mockHeroData))
      .and.callThrough();
    const componentSpy = spyOn(
      component,
      'searchHeroFilterName'
    ).and.callThrough();

    component.searchHeroFilterName(heroNameFilter);

    expect(componentSpy).toHaveBeenCalled();
    expect(apiSpy).toHaveBeenCalled();
  });

  it('should call createNewHero and update heroData', () => {
    const apiSpyCreate = spyOn(apiServiceMock, 'createHero')
      .and.returnValue(of(mockHero))
      .and.callThrough();
    const apiSpyGet = spyOn(apiServiceMock, 'getHero')
      .and.returnValue(of(mockHeroData))
      .and.callThrough();
    const componentSpy = spyOn(component, 'createNewHero').and.callThrough();

    component.createNewHero(mockHero);

    expect(componentSpy).toHaveBeenCalled();
    expect(apiSpyCreate).toHaveBeenCalledWith(mockHero);
    expect(apiSpyGet).toHaveBeenCalled();
  });

  it('should call editHero data and update heroData', () => {
    const componentSpyEdit = spyOn(component, 'editHero').and.callThrough();
    const apiSpy = spyOn(apiServiceMock, 'editHero').and.callThrough();
    const componentSpySearch = spyOn(component, 'searchHero').and.callThrough();

    component.editHero(mockHero);

    expect(componentSpyEdit).toHaveBeenCalledWith(mockHero);
    expect(apiSpy).toHaveBeenCalledWith(mockHero.id, mockHero);
    expect(componentSpySearch).toHaveBeenCalled();
  });

  it('should call eventReload and update heroData', () => {
    spyOn(component, 'searchHero');

    spyOn(apiService, 'getHero').and.returnValue(of(mockHeroData));
    component.eventReload();

    expect(component.searchHero).toHaveBeenCalled();
  });

  it('should call deleteHero and update heroData', () => {
    const componentSpy = spyOn(component, 'deleteHero').and.callThrough();
    const apiSpyDelete = spyOn(apiServiceMock, 'deleteHero').and.callThrough();
    const apiSpyGet = spyOn(apiServiceMock, 'getHero').and.callThrough();

    component.deleteHero(mockHero.id);

    expect(componentSpy).toHaveBeenCalledWith(mockHero.id);
    expect(apiSpyDelete).toHaveBeenCalledWith(mockHero.id);
    expect(apiSpyGet).toHaveBeenCalled();
  });
});
