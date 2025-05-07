import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPriscriptionComponent } from './doctor-priscription.component';

describe('DoctorPriscriptionComponent', () => {
  let component: DoctorPriscriptionComponent;
  let fixture: ComponentFixture<DoctorPriscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorPriscriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorPriscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
