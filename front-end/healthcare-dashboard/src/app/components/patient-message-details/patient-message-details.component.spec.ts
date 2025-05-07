import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMessageDetailsComponent } from './patient-message-details.component';

describe('PatientMessageDetailsComponent', () => {
  let component: PatientMessageDetailsComponent;
  let fixture: ComponentFixture<PatientMessageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientMessageDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientMessageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
