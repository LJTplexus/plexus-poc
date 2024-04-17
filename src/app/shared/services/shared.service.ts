import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {
  activeSpinner = new BehaviorSubject<boolean>(false);

  activeSpinner$ = this.activeSpinner.asObservable();

  showSpinner(active: boolean) {
    this.activeSpinner.next(active);
  }
}
