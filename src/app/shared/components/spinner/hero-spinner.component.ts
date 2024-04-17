import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'hero-spinner-component',
  templateUrl: './hero-spinner.component.html',
  styleUrls: ['./hero-spinner.component.scss'],
})
export class HeroSpinnerComponent implements OnInit {
  public status;
  @Output() actionButton: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @Input() set next(disabled: boolean) {
    this.status = disabled;
    this._cdr.detectChanges();
  }

  constructor(private _cdr: ChangeDetectorRef) {
    this.status = true;
  }

  ngOnInit(): void {
    this.showSpinner();
  }

  public showSpinner(): boolean {
    return this.status;
  }

  public statusStep(value: boolean): void {
    this.actionButton.emit(value);
  }
}
