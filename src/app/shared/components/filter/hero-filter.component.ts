import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroDialogComponent } from '../dialog/hero-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HeroList } from '../../model/hero.interface';

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
  constructor(public dialog: MatDialog, private formBuilder: FormBuilder) {
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
        }
      });
  }

  searchHeroFilter(heroId: string): void {
    this.filterHeroNameEvent.emit(heroId);
  }
}
