import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroList } from 'src/app/shared/model/hero.interface';

@Injectable({ providedIn: 'root' })
export class ApiService {
  heroList?: HeroList;

  constructor(private httpClient: HttpClient) {}

  public getHero(): Observable<any> {
    const url = 'http://localhost:3000/heros';
    return this.httpClient.get<HeroList>(url);
  }

  public getHeroByFilterId(heroId: number): Observable<any> {
    const url = 'http://localhost:3000/heros/' + heroId;
    return this.httpClient.get<HeroList>(url);
  }

  public getHeroByFilterName(heroName: string): Observable<any> {
    const url = 'http://localhost:3000/heros?heroName_like=' + heroName;
    return this.httpClient.get<HeroList>(url);
  }

  public createHero(heroInfo: HeroList): Observable<any> {
    const url = 'http://localhost:3000/heros';
    return this.httpClient.post<HeroList>(url, heroInfo);
  }

  public editHero(heroId: number, heroInfo: HeroList): Observable<any> {
    const url = 'http://localhost:3000/heros/' + heroId;
    return this.httpClient.put<HeroList>(url, heroInfo);
  }

  public deleteHero(heroId: number): Observable<any> {
    const url = 'http://localhost:3000/heros/' + heroId;
    return this.httpClient.delete<HeroList>(url);
  }
}
