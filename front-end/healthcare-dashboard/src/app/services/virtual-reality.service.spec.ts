import { TestBed } from '@angular/core/testing';

import { VirtualRealityService } from './virtual-reality.service';

describe('VirtualRealityService', () => {
  let service: VirtualRealityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VirtualRealityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
