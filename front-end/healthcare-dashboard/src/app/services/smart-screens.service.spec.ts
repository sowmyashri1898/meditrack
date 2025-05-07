import { TestBed } from '@angular/core/testing';

import { SmartScreensService } from './smart-screens.service';

describe('SmartScreensService', () => {
  let service: SmartScreensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartScreensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
