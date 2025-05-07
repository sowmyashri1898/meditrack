import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairWorkComponent } from './repair-work.component';

describe('RepairWorkComponent', () => {
  let component: RepairWorkComponent;
  let fixture: ComponentFixture<RepairWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepairWorkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepairWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
