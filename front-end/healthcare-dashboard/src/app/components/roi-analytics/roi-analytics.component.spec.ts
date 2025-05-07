import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoiAnalyticsComponent } from './roi-analytics.component';

describe('RoiAnalyticsComponent', () => {
  let component: RoiAnalyticsComponent;
  let fixture: ComponentFixture<RoiAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoiAnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoiAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
