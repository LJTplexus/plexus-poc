import { Component } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ApiService } from 'src/app/services/api/api.service';
import { HeroDialogComponent } from '../dialog/hero-dialog.component';
import { MatDialog } from '@angular/material/dialog';

/* export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
} */

@Component({
  selector: 'hero-filter-component',
  templateUrl: './hero-filter.component.html',
  styleUrls: ['./hero-filter.component.scss'],
})
export class HeroFilterComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    private readonly _service: ApiService,
    public dialog: MatDialog
  ) {}

  // matcher = new MyErrorStateMatcher();
  addNewHero(): void {
    this.dialog
      .open(HeroDialogComponent, {
        data: {},
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          alert('result');
        } else {
          alert('error');
        }
      });
  }

  searchHero(): void {
    this._service.getHero().subscribe((data) => {
      alert(data);
    });
  }

  editHero(heroSelected: string): void {
    this.dialog
      .open(HeroDialogComponent, {
        data: { heroSelected },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.searchHero();
        } else {
          alert('error');
        }
      });
  }
}
