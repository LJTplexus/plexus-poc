import { SharedService } from './shared.service';

describe('SharedService', () => {
  let sharedService: SharedService;

  beforeEach(() => {
    sharedService = new SharedService();
  });

  it('should create the service', () => {
    expect(sharedService).toBeTruthy();
  });

  it('should initialize activeSpinner with false', () => {
    expect(sharedService.activeSpinner.getValue()).toBe(false);
  });

  it('should show spinner when called with true', () => {
    sharedService.showSpinner(true);
    expect(sharedService.activeSpinner.getValue()).toBe(true);
  });

  it('should hide spinner when called with false', () => {
    sharedService.showSpinner(true);
    sharedService.showSpinner(false);
    expect(sharedService.activeSpinner.getValue()).toBe(false);
  });

  it('should emit true when showSpinner is called with true', () => {
    const spy = spyOn(sharedService.activeSpinner, 'next');
    sharedService.showSpinner(true);
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should emit false when showSpinner is called with false', () => {
    const spy = spyOn(sharedService.activeSpinner, 'next');
    sharedService.showSpinner(false);
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('should subscribe to activeSpinner$ and receive the initial value', (done) => {
    sharedService.activeSpinner$.subscribe((value: any) => {
      expect(value).toBe(false);
      done();
    });
  });

  it('should subscribe to activeSpinner$ and receive updated value', (done) => {
    sharedService.showSpinner(true);
    sharedService.activeSpinner$.subscribe((value: any) => {
      expect(value).toBe(true);
      done();
    });
  });
});
