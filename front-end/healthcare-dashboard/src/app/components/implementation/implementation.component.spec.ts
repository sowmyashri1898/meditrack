import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplementationComponent } from './implementation.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ImplementationComponent', () => {
  let component: ImplementationComponent;
  let fixture: ComponentFixture<ImplementationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
           imports: [HttpClientModule],  // Add HttpClientModule in imports
           schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Include CUSTOM_ELEMENTS_SCHEMA if needed
,
      declarations: [ImplementationComponent,HeaderComponent]
    });
    fixture = TestBed.createComponent(ImplementationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
