import { Injectable, ComponentRef, ViewContainerRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HeroSpinnerComponent } from '../components/spinner/hero-spinner.component';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private _ref: ComponentRef<HeroSpinnerComponent> | undefined;

  constructor() {}

  public show(view?: ViewContainerRef): Observable<Boolean | null> {
    if (this._ref) {
      this._ref.instance.next = true;
      this._ref.instance.status = true;
    } else {
      this._ref = view?.createComponent(HeroSpinnerComponent);
    }

    return this._ref?.instance.actionButton || of(null);
  }

  public hide(view?: ViewContainerRef): Observable<Boolean | null> {
    if (this._ref) {
      this._ref?.destroy();
      this._ref = undefined;
    }
    return of(null);
  }
}
