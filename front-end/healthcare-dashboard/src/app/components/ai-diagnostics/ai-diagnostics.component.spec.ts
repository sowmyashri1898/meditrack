import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AIDiagnosticsComponent } from './ai-diagnostics.component';

describe('AIDiagnosticsComponent', () => {
  let component: AIDiagnosticsComponent;
  let fixture: ComponentFixture<AIDiagnosticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AIDiagnosticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AIDiagnosticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
