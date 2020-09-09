import { TestBed } from '@angular/core/testing';

import { UserConfigurerService } from './user-configurer.service';

describe('UserConfigurerService', () => {
  let service: UserConfigurerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserConfigurerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
