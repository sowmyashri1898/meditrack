import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorVisitComponent } from './doctor-visit.component';

describe('DoctorVisitComponent', () => {
  let component: DoctorVisitComponent;
  let fixture: ComponentFixture<DoctorVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorVisitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
