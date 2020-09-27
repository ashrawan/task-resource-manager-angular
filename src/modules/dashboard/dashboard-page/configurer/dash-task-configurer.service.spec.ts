import { TestBed } from '@angular/core/testing';

import { DashTaskConfigurerService } from './dash-task-configurer.service';

describe('DashTaskConfigurerService', () => {
  let service: DashTaskConfigurerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashTaskConfigurerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
