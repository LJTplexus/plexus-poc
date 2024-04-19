import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroList } from '../../model/hero.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/core/api/api.service';

@Component({
  selector: 'hero-dialog-component',
  templateUrl: './hero-dialog.component.html',
  styleUrls: ['./hero-dialog.component.scss'],
})
export class HeroDialogComponent {
  selectedHero: HeroList = {
    id: 0,
    heroName: '',
    description: '',
    company: '',
    canFly: false,
  };
  form: FormGroup;
  isEdit: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<HeroDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HeroList,

    private formBuilder: FormBuilder,
    public _snackBar: MatSnackBar,
    private _service: ApiService
  ) {
    if (this.data.id !== undefined) {
      this._service.getHeroByFilterId(this.data.id).subscribe((data) => {
        this.selectedHero = data;
        this.selectedHero.company = data.company;
      });
    } else {
      this.isEdit = false;
    }
    this.selectedHero.company = data.company;
    this.form = this.formBuilder.group({
      frm_heroName: [0, [Validators.required, Validators.maxLength(15)]],
      frm_description: ['', [Validators.required, Validators.maxLength(15)]],
      frm_company: ['', [Validators.required, Validators.maxLength(15)]],
      frm_canFly: ['', [Validators.required]],
    });
  }

  closeClick(): void {
    this.dialogRef.close(false);
  }

  onSubmit(): void {
    this.dialogRef.close(this.selectedHero);
  }
}
