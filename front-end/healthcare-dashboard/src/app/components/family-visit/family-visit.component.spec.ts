import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyVisitComponent } from './family-visit.component';

describe('FamilyVisitComponent', () => {
  let component: FamilyVisitComponent;
  let fixture: ComponentFixture<FamilyVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyVisitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FamilyVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
