import { TestBed } from '@angular/core/testing';

import { MyTaskBoardConfigurerService } from './my-task-board-configurer.service';

describe('MyTaskBoardConfigurerService', () => {
  let service: MyTaskBoardConfigurerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyTaskBoardConfigurerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
