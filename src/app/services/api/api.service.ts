import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HeroList } from 'src/app/components/model/hero.interface';

@Injectable({ providedIn: 'root' })
export class ApiService {
  heroList?: HeroList;

  constructor(private httpClient: HttpClient) {}

  /*   public getHeroList(): Observable<HeroList> {
    // const wrapperAddress = this.configService.getValue('wrapperAddress');

    return this.httpClient
      .get<HeroList>(
        //`${wrapperAddress}/common-back-wrapper-service/1.0/user/details`,
        `http://localhost:3000/posts`
      )
      .pipe(
        tap((res) => {
          this.heroList = res;
        })
      );
  }
} */
  public getHero(): Observable<any> {
    const url = 'http://localhost:3000/posts';
    return this.httpClient.get<HeroList>(url);
  }

  public createHero(heroInfo: HeroList): Observable<any> {
    const url = 'http://localhost:3000/posts';
    return this.httpClient.post<HeroList>(url, heroInfo);
  }

  public editHero(heroSelected: string): Observable<any> {
    const url = 'http://localhost:3000/posts/' + heroSelected;
    return this.httpClient.post<HeroList>(url, heroSelected);
  }

  public deleteHero(heroSelected: string): Observable<any> {
    const url = 'http://localhost:3000/posts/' + heroSelected;
    return this.httpClient.delete<HeroList>(url);
  }
}
