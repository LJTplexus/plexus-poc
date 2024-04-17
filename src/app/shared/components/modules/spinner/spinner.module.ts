import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HeroSpinnerComponent } from '../../spinner/hero-spinner.component';

@NgModule({
  declarations: [HeroSpinnerComponent],
  imports: [CommonModule, CommonModule, HttpClientModule],
  exports: [HeroSpinnerComponent],
})
export class SpinnerModule {}
