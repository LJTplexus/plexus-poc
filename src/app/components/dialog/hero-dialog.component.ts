import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeroList } from '../model/hero.interface';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'hero-dialog-component',
  templateUrl: './hero-dialog.component.html',
  styleUrls: ['./hero-dialog.component.scss'],
})
export class HeroDialogComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    public dialogRef: MatDialogRef<HeroDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HeroList
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
