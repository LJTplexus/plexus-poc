import { Observable, of } from 'rxjs';
import { HeroList } from 'src/app/shared/model/hero.interface';

export class MockApiService {
  getHero(): Observable<any> {
    return of({});
  }
  getHeroByFilterName(heroName: string): Observable<any> {
    return of({});
  }
  createHero(heroInfo: HeroList): Observable<any> {
    return of({});
  }
  editHero(heroId: number, heroInfo: HeroList): Observable<any> {
    return of({});
  }
  deleteHero(heroId: number): Observable<any> {
    return of({});
  }
}

export class MockSpinnerService {
  show(): any {}
  hide(): any {}
}

export class MockSnackBar {
  open(): any {
    return null;
  }
}
