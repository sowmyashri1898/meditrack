import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorVisitFormComponent } from './doctor-visit-form.component';

describe('DoctorVisitFormComponent', () => {
  let component: DoctorVisitFormComponent;
  let fixture: ComponentFixture<DoctorVisitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorVisitFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorVisitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
