import { Component, OnInit, ViewContainerRef } from '@angular/core';
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
  heroData: HeroList[] = [];
  companyName: string = '* Company: *';
  canFlyInfo: string = '* This hero: *';

  constructor(
    private readonly _service: ApiService,
    public dialog: MatDialog,
    public _snackBar: MatSnackBar,
    private readonly _view: ViewContainerRef,
    private readonly _spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.searchHero();
  }

  public searchHero(): void {
    this._spinnerService.show(this._view);
    this._service.getHero().subscribe((data) => {
      this.heroData = data;
      this.heroData = data.map((element: HeroList) => {
        return this.buildDto(element);
      });
      this._spinnerService.hide(this._view);
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

  editHero(heroSelected: number): void {
    this.dialog
      .open(HeroDialogComponent, {
        data: { id: heroSelected },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.searchHero();
        } else {
          this._snackBar.open(`Error edit hero: ${result} `, '', {
            duration: 2000,
          });
        }
      });
  }

  deleteHero(heroSelected: number): void {
    this._service.deleteHero(heroSelected).subscribe((result) => {
      if (result) {
        this.searchHero();
      } else {
        this._snackBar.open(`Error delete hero: ${result} `, '', {
          duration: 2000,
        });
      }
    });
  }
}
