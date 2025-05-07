import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLabResultComponent } from './view-lab-result.component';

describe('ViewLabResultComponent', () => {
  let component: ViewLabResultComponent;
  let fixture: ComponentFixture<ViewLabResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewLabResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewLabResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
