import { NgModule } from '@angular/core';
import { HeroFilterComponent } from './filter/hero-filter.component';
import { HeroHeaderComponent } from './header/hero-header.component';
import { HeroTableComponent } from './table/hero-table.component';
import { HeroComponentComponent } from './hero-component.component';
import { HeroRoutingModule } from './hero-routing.module';
import { MaterialModule } from './material.module';
import { HeroDialogComponent } from './dialog/hero-dialog.component';

@NgModule({
  declarations: [
    HeroComponentComponent,
    HeroFilterComponent,
    HeroHeaderComponent,
    HeroTableComponent,
    HeroDialogComponent,
  ],
  imports: [HeroRoutingModule, MaterialModule],
  providers: [],
  exports: [HeroComponentComponent],
})
export class HeroModule {}
