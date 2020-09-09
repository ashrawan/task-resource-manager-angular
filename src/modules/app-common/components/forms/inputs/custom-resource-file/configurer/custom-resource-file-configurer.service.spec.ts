import { TestBed } from '@angular/core/testing';

import { CustomResourceFileConfigurerService } from './custom-resource-file-configurer.service';

describe('CustomResourceFileConfigurerService', () => {
  let service: CustomResourceFileConfigurerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomResourceFileConfigurerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
