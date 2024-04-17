import { Component, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/api/api.service';
import { HeroDialogComponent } from '../dialog/hero-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeroList } from '../../model/hero.interface';
import { SpinnerService } from '../../services/spinner.services';

@Component({
  selector: 'hero-filter-component',
  templateUrl: './hero-filter.component.html',
  styleUrls: ['./hero-filter.component.scss'],
})
export class HeroFilterComponent {
  form: FormGroup;
  heroList: HeroList = {
    id: 0,
    heroName: '',
    description: '',
    company: '',
    canFly: false,
  };
  constructor(
    private readonly _service: ApiService,
    public dialog: MatDialog,
    public _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private readonly _view: ViewContainerRef,
    private readonly _spinnerService: SpinnerService
  ) {
    this.form = this.formBuilder.group({
      frm_heroName: ['', [Validators.required, Validators.maxLength(15)]],
    });
  }

  addNewHero(): void {
    this.dialog
      .open(HeroDialogComponent, {
        width: '500px',
        data: {},
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          /*           this._spinnerService.show(this._view); */
          this._snackBar.open(`Create new hero: ${result} `);
          this._service.getHero();
          /*           this._spinnerService.hide(this._view); */
        } else {
          this._snackBar.open(`Cannot create new hero: ${result}`, '', {
            duration: 2000,
          });
        }
      });
  }

  editHero(heroSelected: string): void {
    this.dialog
      .open(HeroDialogComponent, {
        data: { id: heroSelected },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this._service.getHero();
        } else {
          alert('error component');
        }
      });
  }

  searchHeroByFilter(heroId: string): void {
    this._service.getHeroByFilterName(heroId).subscribe(
      (data) => {},
      (error) => this._snackBar.open(error)
    );
  }
}
