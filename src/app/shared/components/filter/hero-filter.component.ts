import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewContainerRef,
} from '@angular/core';
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
  @Output() filterHeroNameEvent = new EventEmitter<string>();
  @Output() newHeroEvent = new EventEmitter<any>();
  @Output() modifyHeroEvent = new EventEmitter<any>();

  form: FormGroup;
  heroList: HeroList = {
    id: 0,
    heroName: '',
    description: '',
    company: '',
    canFly: false,
  };
  constructor(
    public dialog: MatDialog,
    public _snackBar: MatSnackBar,
    private formBuilder: FormBuilder
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
          this.newHeroEvent.emit(result);
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
          this.modifyHeroEvent.emit();
        } else {
          this._snackBar.open(`Cannot create new hero: ${result}`, '', {
            duration: 2000,
          });
        }
      });
  }
  searchHeroFilter(heroId: string): void {
    this.filterHeroNameEvent.emit(heroId);
  }
}
