import { NgModule } from '@angular/core';
import { HeroFilterComponent } from '../../shared/components/filter/hero-filter.component';
import { HeroHeaderComponent } from '../../shared/components/header/hero-header.component';
import { HeroCardComponent } from '../../shared/components/card/hero-card.component';
import { HeroComponent } from './hero-component.component';
import { HeroRoutingModule } from './hero-routing.module';
import { MaterialModule } from '../../shared/components/modules/material/material.module';
import { HeroDialogComponent } from '../../shared/components/dialog/hero-dialog.component';
import { CommonModule } from '@angular/common';
import { SpinnerModule } from 'src/app/shared/components/modules/spinner/spinner.module';
import { ConfirmationDialogComponent } from 'src/app/shared/components/dialog-confirm/dialog-confirm.component';
import { PipesModule } from 'src/app/shared/components/modules/pipes/pipes.module';

@NgModule({
  declarations: [
    HeroComponent,
    HeroFilterComponent,
    HeroHeaderComponent,
    HeroCardComponent,
    HeroDialogComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    HeroRoutingModule,
    MaterialModule,
    CommonModule,
    SpinnerModule,
    PipesModule,
  ],
  providers: [],
  exports: [HeroComponent],
})
export class HeroModule {}
