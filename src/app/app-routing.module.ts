import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiService } from './services/api/api.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorsInterceptor } from './services/http-errors/http-errors.interceptor';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/hero-component.module').then((m) => m.HeroModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorsInterceptor,
      multi: true,
    },
    ApiService,
  ],
})
export class AppRoutingModule {}
