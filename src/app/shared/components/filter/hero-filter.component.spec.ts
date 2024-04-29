import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeroFilterComponent } from './hero-filter.component';
import { HeroList } from '../../model/hero.interface';
import { MaterialModule } from '../modules/material/material.module';
import { of } from 'rxjs';

describe('HeroFilterComponent', () => {
  let component: HeroFilterComponent;
  let fixture: ComponentFixture<HeroFilterComponent>;
  let mockFormBuilder: FormBuilder;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;
  const mockHeroData: HeroList = {
    id: 1,
    heroName: 'hero',
    description: 'hero',
    company: 'hero',
    canFly: false,
  };

  beforeEach(() => {
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [HeroFilterComponent],
      imports: [ReactiveFormsModule, MaterialModule],
      providers: [
        { provide: FormBuilder, useValue: mockFormBuilder },
        { provide: MatDialog, useValue: mockMatDialog },
        FormBuilder,
      ],
    }).compileComponents();
    mockFormBuilder = TestBed.inject<FormBuilder>(FormBuilder);
    mockFormBuilder = TestBed.get(FormBuilder);

    fixture = TestBed.createComponent(HeroFilterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchHeroFilter and emit filterHeroNameEvent', () => {
    spyOn(component.filterHeroNameEvent, 'emit');

    component.searchHeroFilter('1');

    expect(component.filterHeroNameEvent.emit).toHaveBeenCalledWith('1');
  });

  it('should emit newHeroEvent when result is truthy', () => {
    const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    mockDialogRef.afterClosed.and.returnValue(of(mockHeroData));
    mockMatDialog.open.and.returnValue(mockDialogRef);

    let emittedResult: any;
    component.newHeroEvent.subscribe((result) => {
      emittedResult = result;
    });

    component.addNewHero();
    expect(mockMatDialog.open).toHaveBeenCalled();
    expect(emittedResult).toEqual(mockHeroData);
  });

  it('should not emit newHeroEvent when result is falsy', () => {
    const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    mockDialogRef.afterClosed.and.returnValue(of(null));
    mockMatDialog.open.and.returnValue(mockDialogRef);

    let emittedResult: any;
    component.newHeroEvent.subscribe((result) => {
      emittedResult = result;
    });

    component.addNewHero();
    expect(mockMatDialog.open).toHaveBeenCalled();
    expect(emittedResult).toBeUndefined();
  });
});
