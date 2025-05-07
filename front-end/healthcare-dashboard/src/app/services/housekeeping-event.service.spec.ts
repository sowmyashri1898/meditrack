import { TestBed } from '@angular/core/testing';

import { HousekeepingEventService } from './housekeeping-event.service';

describe('HousekeepingEventService', () => {
  let service: HousekeepingEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HousekeepingEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
