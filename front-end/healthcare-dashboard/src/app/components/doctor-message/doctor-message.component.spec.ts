import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorMessageComponent } from './doctor-message.component';

describe('DoctorMessageComponent', () => {
  let component: DoctorMessageComponent;
  let fixture: ComponentFixture<DoctorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
