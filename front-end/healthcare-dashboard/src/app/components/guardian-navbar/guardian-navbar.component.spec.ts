import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardianNavbarComponent } from './guardian-navbar.component';

describe('GuardianNavbarComponent', () => {
  let component: GuardianNavbarComponent;
  let fixture: ComponentFixture<GuardianNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuardianNavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuardianNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
