import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcareUserComponent } from './healthcare-user.component';

describe('HealthcareUserComponent', () => {
  let component: HealthcareUserComponent;
  let fixture: ComponentFixture<HealthcareUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthcareUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HealthcareUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
