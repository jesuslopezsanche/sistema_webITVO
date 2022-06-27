import { TestBed } from '@angular/core/testing';

import { ExitMonitorGuard } from './exit-monitor.guard';

describe('ExitMonitorGuard', () => {
  let guard: ExitMonitorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ExitMonitorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
