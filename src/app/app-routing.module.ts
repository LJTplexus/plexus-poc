import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiService } from './core/api/api.service';
import { SharedService } from './shared/services/shared.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./views/components/hero-component.module').then(
        (m) => m.HeroModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ApiService, SharedService],
})
export class AppRoutingModule {}
