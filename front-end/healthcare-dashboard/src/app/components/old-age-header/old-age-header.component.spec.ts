import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldAgeHeaderComponent } from './old-age-header.component';

describe('OldAgeHeaderComponent', () => {
  let component: OldAgeHeaderComponent;
  let fixture: ComponentFixture<OldAgeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OldAgeHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OldAgeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
