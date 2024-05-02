import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { HeroList } from '../../model/hero.interface';
import { HeroCardComponent } from './hero-card.component';

describe('HeroCardComponent', () => {
  let component: HeroCardComponent;
  let fixture: ComponentFixture<HeroCardComponent>;
  let dialog: jasmine.SpyObj<MatDialog>;
  const mockHeroData: HeroList[] = [
    {
      id: 1,
      heroName: 'Test Hero',
      description: 'Test Description',
      company: 'Test Company',
      canFly: true,
    },
    {
      id: 2,
      heroName: 'Test Hero',
      description: 'Test Description',
      company: 'Test Company',
      canFly: true,
    },
  ];

  beforeEach(() => {
    const mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [HeroCardComponent],
      providers: [{ provide: MatDialog, useValue: mockDialog }],
    }).compileComponents();

    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call setHeroCard', () => {
    component.heroData = mockHeroData;

    spyOn(component, 'setHeroCard');

    component.setHeroCard();

    expect(component.setHeroCard).toHaveBeenCalled();
  });

  it('should call setHeroCard method on ngOnInit', () => {
    component.heroData = mockHeroData;
    spyOn(component, 'setHeroCard');
    component.ngOnInit();
    expect(component.setHeroCard).toHaveBeenCalled();
  });

  it('should set hero card properly', () => {
    component.heroData = mockHeroData;
    component.setHeroCard();
    expect(component.heroData.length).toBe(2);
  });

  it('should emit heroDataDeleteEvent on deleteHero', () => {
    const heroId = 1;
    spyOn(component.heroDataDeleteEvent, 'emit');
    component.deleteHero(heroId);
    expect(component.heroDataDeleteEvent.emit).toHaveBeenCalledWith(heroId);
  });

  it('should open dialog and emit event on editHero', () => {
    const heroId = 1;
    const editedHero: HeroList = {
      id: 1,
      heroName: 'Hero 1',
      description: 'Description 1',
      company: 'Company 1',
      canFly: true,
    };
    const dialogRefSpyObj = jasmine.createSpyObj({
      afterClosed: of(editedHero),
    });
    dialog.open.and.returnValue(dialogRefSpyObj);
    spyOn(component.heroDataModifyEvent, 'emit');

    component.editHero(heroId);

    expect(dialog.open).toHaveBeenCalledOnceWith(jasmine.any(Function), {
      data: { id: heroId },
    });
    expect(component.heroDataModifyEvent.emit).toHaveBeenCalledWith(editedHero);
  });
});
