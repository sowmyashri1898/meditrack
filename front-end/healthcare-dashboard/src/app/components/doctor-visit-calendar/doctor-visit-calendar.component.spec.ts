import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorVisitCalendarComponent } from './doctor-visit-calendar.component';

describe('DoctorVisitCalendarComponent', () => {
  let component: DoctorVisitCalendarComponent;
  let fixture: ComponentFixture<DoctorVisitCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorVisitCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorVisitCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
