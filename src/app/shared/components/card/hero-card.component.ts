import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HeroList } from '../../model/hero.interface';
import { MatDialog } from '@angular/material/dialog';
import { HeroDialogComponent } from '../dialog/hero-dialog.component';

@Component({
  selector: 'hero-card-component',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss'],
})
export class HeroCardComponent implements OnInit {
  @Input() heroData: HeroList[] = [];

  @Output() heroDataModifyEvent = new EventEmitter<HeroList>();
  @Output() heroDataDeleteEvent = new EventEmitter<number>();
  companyName: string = '* Company: *';
  canFlyInfo: string = '* This hero: *';

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.setHeroCard();
  }

  setHeroCard(): void {
    this.heroData.map((element: HeroList) => {
      return this.buildDto(element);
    });
  }

  buildDto(element: any): HeroList {
    return {
      id: element.id,
      heroName: element.heroName,
      description: element.description,
      company: element.company,
      canFly: element.canfly,
    };
  }

  editHero(heroId: number): void {
    this.dialog
      .open(HeroDialogComponent, {
        data: { id: heroId },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.heroDataModifyEvent.emit(result);
        }
      });
  }

  deleteHero(heroId: number): void {
    this.heroDataDeleteEvent.emit(heroId);
  }
}
