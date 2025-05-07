import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardianNotificationComponent } from './guardian-notification.component';

describe('GuardianNotificationComponent', () => {
  let component: GuardianNotificationComponent;
  let fixture: ComponentFixture<GuardianNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuardianNotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuardianNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
