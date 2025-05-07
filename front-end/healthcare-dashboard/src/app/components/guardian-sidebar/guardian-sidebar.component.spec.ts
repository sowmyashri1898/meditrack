import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardianSidebarComponent } from './guardian-sidebar.component';

describe('GuardianSidebarComponent', () => {
  let component: GuardianSidebarComponent;
  let fixture: ComponentFixture<GuardianSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuardianSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuardianSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
