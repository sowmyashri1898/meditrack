import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualRealityDetailsComponent } from './virtual-reality-details.component';

describe('VirtualRealityDetailsComponent', () => {
  let component: VirtualRealityDetailsComponent;
  let fixture: ComponentFixture<VirtualRealityDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VirtualRealityDetailsComponent]
    });
    fixture = TestBed.createComponent(VirtualRealityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
