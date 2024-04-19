import { MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './dialog-confirm.component';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let matDialogRef: jasmine.SpyObj<MatDialogRef<ConfirmationDialogComponent>>;

  beforeEach(() => {
    matDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    component = new ConfirmationDialogComponent(matDialogRef, {
      message: 'Are you sure?',
    });
  });

  it('should create ConfirmationDialogComponent', () => {
    expect(component).toBeTruthy();
    expect(component.data).toEqual({ message: 'Are you sure?' });
  });

  it('should call onConfirm', () => {
    component.onConfirm();
    expect(matDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should call onCancel', () => {
    component.onCancel();
    expect(matDialogRef.close).toHaveBeenCalledWith(false);
  });
});
