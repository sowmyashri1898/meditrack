import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousekeepingRepairComponent } from './housekeeping-repair.component';

describe('HousekeepingRepairComponent', () => {
  let component: HousekeepingRepairComponent;
  let fixture: ComponentFixture<HousekeepingRepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HousekeepingRepairComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HousekeepingRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
