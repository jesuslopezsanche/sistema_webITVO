import { TestBed } from '@angular/core/testing';

import { CompleteSignupGuard } from './complete-signup.guard';

describe('CompleteSignupGuard', () => {
  let guard: CompleteSignupGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CompleteSignupGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
