import { TestBed } from '@angular/core/testing';

import { DoctorVisitService } from './doctor-visit.service';

describe('DoctorVisitService', () => {
  let service: DoctorVisitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorVisitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
