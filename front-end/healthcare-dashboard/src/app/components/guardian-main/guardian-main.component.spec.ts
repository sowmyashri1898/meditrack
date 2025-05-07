import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardianMainComponent } from './guardian-main.component';

describe('GuardianMainComponent', () => {
  let component: GuardianMainComponent;
  let fixture: ComponentFixture<GuardianMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuardianMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuardianMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
