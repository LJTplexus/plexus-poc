import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { HeroList } from '../../model/hero.interface';
import { ApiService } from 'src/app/core/api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { HeroDialogComponent } from '../dialog/hero-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from '../../services/spinner.services';

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

  constructor(
    public dialog: MatDialog,
    public _snackBar: MatSnackBar,
    private readonly _view: ViewContainerRef,
    private readonly _spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.setHeroCard();
  }

  setHeroCard(): void {
    this._spinnerService.show(this._view);
    this.heroData.map((element: HeroList) => {
      return this.buildDto(element);
    });
    this._spinnerService.hide(this._view);
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
        } else {
          this._snackBar.open(`Error edit hero: ${result} `, '', {
            duration: 2000,
          });
        }
      });
  }

  deleteHero(heroId: number): void {
    this.heroDataDeleteEvent.emit(heroId);
  }
}
