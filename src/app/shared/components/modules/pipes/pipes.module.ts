import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoldPipe } from '../../pipes/bold.pipe';

@NgModule({
  imports: [CommonModule],
  providers: [],
  declarations: [BoldPipe],
  exports: [BoldPipe],
})
export class PipesModule {}
