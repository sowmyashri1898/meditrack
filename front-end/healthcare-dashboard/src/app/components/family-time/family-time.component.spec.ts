import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyTimeComponent } from './family-time.component';

describe('FamilyTimeComponent', () => {
  let component: FamilyTimeComponent;
  let fixture: ComponentFixture<FamilyTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FamilyTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
