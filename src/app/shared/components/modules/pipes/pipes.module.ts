import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoldPipe } from '../../pipes/bold.pipe';
import { FilterPipe } from '../../pipes/filter.pipe';

@NgModule({
  imports: [CommonModule],
  providers: [],
  declarations: [BoldPipe, FilterPipe],
  exports: [BoldPipe, FilterPipe],
})
export class PipesModule {}
