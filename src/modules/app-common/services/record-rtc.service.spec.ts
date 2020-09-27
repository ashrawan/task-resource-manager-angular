import { TestBed } from '@angular/core/testing';

import { RecordRtcService } from './record-rtc.service';

describe('RecordRtcService', () => {
  let service: RecordRtcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordRtcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
