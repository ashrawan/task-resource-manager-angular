import { TestBed } from '@angular/core/testing';

import { DashConfigurerService } from './dash-configurer.service';

describe('DashConfigurerService', () => {
  let service: DashConfigurerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashConfigurerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
