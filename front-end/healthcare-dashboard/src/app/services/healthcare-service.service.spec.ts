import { TestBed } from '@angular/core/testing';

import { HealthcareServiceService } from './healthcare-service.service';

describe('HealthcareServiceService', () => {
  let service: HealthcareServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthcareServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
