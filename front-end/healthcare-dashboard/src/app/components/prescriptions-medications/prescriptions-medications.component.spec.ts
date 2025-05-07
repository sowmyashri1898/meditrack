import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionsMedicationsComponent } from './prescriptions-medications.component';

describe('PrescriptionsMedicationsComponent', () => {
  let component: PrescriptionsMedicationsComponent;
  let fixture: ComponentFixture<PrescriptionsMedicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrescriptionsMedicationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrescriptionsMedicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
