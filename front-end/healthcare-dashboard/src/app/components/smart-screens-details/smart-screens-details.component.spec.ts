import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartScreensDetailsComponent } from './smart-screens-details.component';

describe('SmartScreensDetailsComponent', () => {
  let component: SmartScreensDetailsComponent;
  let fixture: ComponentFixture<SmartScreensDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartScreensDetailsComponent]
    });
    fixture = TestBed.createComponent(SmartScreensDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
