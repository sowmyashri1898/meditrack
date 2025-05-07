import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ROIDashboardComponent } from './roi-dashboard.component';

describe('ROIDashboardComponent', () => {
  let component: ROIDashboardComponent;
  let fixture: ComponentFixture<ROIDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ROIDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ROIDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
