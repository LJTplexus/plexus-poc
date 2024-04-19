import { ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/core/api/api.service';
import { HeroFilterComponent } from './hero-filter.component';
import { HeroList } from '../../model/hero.interface';
import { MaterialModule } from '../modules/material/material.module';

describe('HeroFilterComponent', () => {
  let component: HeroFilterComponent;
  let fixture: ComponentFixture<HeroFilterComponent>;
  let apiService: ApiService;
  let matDialog: MatDialog;
  let matSnackBar: MatSnackBar;
  let formBuilder: FormBuilder;
  let mockHeroData: HeroList = {
    id: 1,
    heroName: 'hero',
    description: 'hero',
    company: 'hero',
    canFly: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroFilterComponent],
      imports: [ReactiveFormsModule, MaterialModule],
      providers: [
        { provide: ApiService, useValue: {} },
        { provide: MatDialog, useValue: {} },
        { provide: MatSnackBar, useValue: {} },
        { provide: FormBuilder, useValue: {} },
        { provide: ViewContainerRef, useValue: {} },
        FormBuilder,
      ],
    });
    formBuilder = TestBed.inject<FormBuilder>(FormBuilder);
    fixture = TestBed.createComponent(HeroFilterComponent);
    component = fixture.componentInstance;
    apiService = TestBed.get(ApiService);
    matDialog = TestBed.get(MatDialog);
    matSnackBar = TestBed.get(MatSnackBar);
    formBuilder = TestBed.get(FormBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchHeroFilter and emit filterHeroNameEvent', () => {
    spyOn(component.filterHeroNameEvent, 'emit');

    component.searchHeroFilter('1');

    expect(component.filterHeroNameEvent.emit).toHaveBeenCalledWith('1');
  });
});
