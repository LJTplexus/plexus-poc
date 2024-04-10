import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { HeroList } from './model/hero.interface';

@Component({
  selector: 'app-hero-component',
  templateUrl: './hero-component.component.html',
  styleUrls: ['./hero-component.component.scss'],
})
export class HeroComponentComponent {
  // dataSource: new MatTableDataSource(HeroList: HeroList);

  dataSource: HeroList[] = [];
  constructor() {}

  /*   ngOnInit() {
    this.searchHero();
  } */

  /*   searchHero(): void {
    this._service.getHeroList().subscribe((data) => {
      alert(data);
      console.log(this.dataSource);
      console.log(data);
      this.dataSource = data;
      console.log(this.dataSource);
    });
  } */
}
