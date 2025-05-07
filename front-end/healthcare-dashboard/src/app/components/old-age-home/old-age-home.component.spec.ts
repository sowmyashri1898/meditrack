import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldAgeHomeComponent } from './old-age-home.component';

describe('OldAgeHomeComponent', () => {
  let component: OldAgeHomeComponent;
  let fixture: ComponentFixture<OldAgeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OldAgeHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OldAgeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
