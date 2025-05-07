import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorMessageDetailsComponent } from './doctor-message-details.component';

describe('DoctorMessageDetailsComponent', () => {
  let component: DoctorMessageDetailsComponent;
  let fixture: ComponentFixture<DoctorMessageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorMessageDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorMessageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
