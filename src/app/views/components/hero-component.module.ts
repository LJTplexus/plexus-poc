import { NgModule } from '@angular/core';
import { HeroFilterComponent } from '../../shared/components/filter/hero-filter.component';
import { HeroHeaderComponent } from '../../shared/components/header/hero-header.component';
import { HeroCardComponent } from '../../shared/components/card/hero-card.component';
import { HeroComponentComponent } from './hero-component.component';
import { HeroRoutingModule } from './hero-routing.module';
import { MaterialModule } from '../../shared/components/modules/material/material.module';
import { HeroDialogComponent } from '../../shared/components/dialog/hero-dialog.component';
import { CommonModule } from '@angular/common';
import { BoldPipe } from 'src/app/shared/components/pipe/bold.pipe';
import { FilterPipe } from 'src/app/shared/components/pipe/filter.pipe';
import { SpinnerModule } from 'src/app/shared/components/modules/spinner/spinner.module';
import { ConfirmationDialogComponent } from 'src/app/shared/components/dialog-confirm/dialog-confirm.component';

@NgModule({
  declarations: [
    HeroComponentComponent,
    HeroFilterComponent,
    HeroHeaderComponent,
    HeroCardComponent,
    HeroDialogComponent,
    BoldPipe,
    FilterPipe,
    ConfirmationDialogComponent,
  ],
  imports: [HeroRoutingModule, MaterialModule, CommonModule, SpinnerModule],
  providers: [],
  exports: [HeroComponentComponent],
})
export class HeroModule {}
