import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SignupService } from '../../services/signup.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, RouterModule, 
    CalendarModule, DropdownModule,CardModule,MultiSelectModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],

  templateUrl: './doctor-registration.component.html',
  styleUrl: './doctor-registration.component.scss'
})
export class DoctorRegistrationComponent {


  registrationForm: FormGroup;
  genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' }
  ];
  symptomOptions = [
    { name: 'Fever', code: 'fever' },
    { name: 'Cough', code: 'cough' },
    { name: 'Headache', code: 'headache' },
    { name: 'Nausea', code: 'nausea' },
    { name: 'Pain', code: 'pain' }
  ];

  profilePictureURL: string | null = null; // Allow null as the initial value
  constructor(private fb: FormBuilder,private http: HttpClient,private signupService: SignupService) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)]],
      address: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      specialization: ['', Validators.required],
      experienceYears: ['', [Validators.required, Validators.min(0)]],
      hospitalName: ['', Validators.required],
      location: ['', Validators.required],
      profilePicture: ['', Validators.required],
      symptoms: [[], Validators.required]
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form Data:', this.registrationForm.value);
      // Add your logic to send data to the backend here
    } else {
      console.log('Form is invalid');
    }
  }
  updateProfilePictureURL(){
    this.profilePictureURL = this.registrationForm.get('profilePicture')?.value;

  }

  onFileSelect(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }
      console.log('Token before file upload:', token);
  
      const formData = new FormData();
      formData.append('profilePicture', file);
  
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      this.http.post<{ path: string }>('/api/upload', formData, { headers }).subscribe(
        (response) => {
          console.log('File uploaded successfully', response);
          this.profilePictureURL = response.path;
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    }
  }
  
  
  
}

