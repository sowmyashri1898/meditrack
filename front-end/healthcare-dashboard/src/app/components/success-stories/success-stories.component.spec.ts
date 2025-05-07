import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessStoriesComponent } from './success-stories.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SuccessStoriesComponent', () => {
  let component: SuccessStoriesComponent;
  let fixture: ComponentFixture<SuccessStoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
           imports: [HttpClientModule],  // Add HttpClientModule in imports
           schemas: [CUSTOM_ELEMENTS_SCHEMA]  ,// Include CUSTOM_ELEMENTS_SCHEMA if needed

      declarations: [SuccessStoriesComponent,HeaderComponent]
    });
    fixture = TestBed.createComponent(SuccessStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
