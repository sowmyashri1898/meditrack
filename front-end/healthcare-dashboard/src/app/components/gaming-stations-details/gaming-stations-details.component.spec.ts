import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamingStationsDetailsComponent } from './gaming-stations-details.component';

describe('GamingStationsDetailsComponent', () => {
  let component: GamingStationsDetailsComponent;
  let fixture: ComponentFixture<GamingStationsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GamingStationsDetailsComponent]
    });
    fixture = TestBed.createComponent(GamingStationsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
