import { TestBed } from '@angular/core/testing';

import { TaskConfigurerService } from './task-configurer.service';

describe('TaskConfigurerService', () => {
  let service: TaskConfigurerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskConfigurerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
