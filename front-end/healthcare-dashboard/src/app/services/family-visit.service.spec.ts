import { TestBed } from '@angular/core/testing';

import { FamilyVisitService } from './family-visit.service';

describe('FamilyVisitService', () => {
  let service: FamilyVisitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilyVisitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
