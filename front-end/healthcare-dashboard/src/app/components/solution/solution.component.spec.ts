import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionComponent } from './solution.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SolutionComponent', () => {
  let component: SolutionComponent;
  let fixture: ComponentFixture<SolutionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
     imports: [HttpClientModule],  // Add HttpClientModule in imports
      
      declarations: [SolutionComponent,HeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Include CUSTOM_ELEMENTS_SCHEMA if needed

    });
    fixture = TestBed.createComponent(SolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
