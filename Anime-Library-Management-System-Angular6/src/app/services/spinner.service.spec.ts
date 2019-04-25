import { TestBed, inject } from '@angular/core/testing';
import { SpinnerService } from './spinner.service';

// Straight Jasmine testing without Angular's testing support
describe('SpinnerService (no TestBed)', () => {
  let service: SpinnerService;
  beforeEach(() => { service = new SpinnerService(); });

  it('should have spinner as inactive initially', () => {
    expect(service.active).toBe(false);
  });

  it(`#set should set spinner's active value`, () => {
    service.active = true;
    expect(service.active).toBe(true); 
  });

  it('subject should return value from observable', (done: DoneFn) => {
    service.status.subscribe(value => { 
      expect(value).toBe(false);
      done();
    });
    service.active = false;
  });

  it('#start should set spinner to active', () => {
    service.start();
    expect(service.active).toBe(true);
  });

  it('#stop should set spinner to inactive', () => {
    service.stop();
    expect(service.active).toBe(false);
  });
});

describe('SpinnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpinnerService]
    });
  });

  it('should be created', inject([SpinnerService], (service: SpinnerService) => {
    expect(service).toBeTruthy();
  }));
});
