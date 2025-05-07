import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedRecordComponent } from './med-record.component';

describe('MedRecordComponent', () => {
  let component: MedRecordComponent;
  let fixture: ComponentFixture<MedRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedRecordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
