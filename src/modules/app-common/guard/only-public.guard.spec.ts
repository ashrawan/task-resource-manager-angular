import { TestBed } from '@angular/core/testing';

import { OnlyPublicGuard } from './only-public.guard';

describe('OnlyPublicGuard', () => {
  let guard: OnlyPublicGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OnlyPublicGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
