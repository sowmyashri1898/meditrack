import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DoctorService } from '../../services/doctor.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'; // Import MatSelectModule
import { CommonModule } from '@angular/common';
import { DoctorDTO } from '../../classes/doctor.model';
import { SignupService } from '../../services/signup.service';
import { Speciality } from '../../classes/speciality.model';
import { PatientService } from '../../services/patient.service';
import { DropdownModule } from 'primeng/dropdown';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DropdownModule
  ],

  templateUrl: './doctor-profile.component.html',
  styleUrl: './doctor-profile.component.scss',
})
export class DoctorProfileComponent implements OnInit ,AfterViewInit{
  selectedImage: File | null = null;
  selectedImageUrl: string | ArrayBuffer | null = null;
  doctorList: any;
  errorMessage!: string;
  token: string | null = null;
  doctor: any = {};
  editForm!: FormGroup;
  isEditMode = false;
  specialties: Speciality[] = [];
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private route: ActivatedRoute,
    private signupService: SignupService,
    private patientService:PatientService
  ) {}
  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      const authToken = localStorage.getItem('authToken');
    }
  }
  ngOnInit() {
    this.getSpecialties();
    this.token = this.signupService.getAuthToken();
    console.log('Token:', this.token);
    if (this.token) {
      this.loadDoctorData();
    } else {
      console.log('No token found');
    }
    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      specialization: ['', Validators.required],
      experienceYears: ['', [Validators.required, Validators.min(0)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      address: ['', Validators.required],
      location: ['', Validators.required],
      profilePicture: [''],
      hospitalName: ['', Validators.required],
      gender: ['', Validators.required],
    });
  
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImageUrl = reader.result; 
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }
  onLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  populateForm(doctor: any) {
    this.editForm.patchValue({
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      specialization: doctor.specialization,
      experienceYears: doctor.experienceYears,
      email: doctor.email,
      phoneNumber: doctor.phoneNumber,
      address: doctor.address,
      location: doctor.location,
      profilePicture: doctor.profilePicture,
      hospitalName: doctor.hospitalName,
      gender: doctor.gender,
    });
  }

  loadDoctorData(): void {
    if (this.token) {
      this.doctorService.getDoctorDetails(this.token).subscribe(
        (data) => {
          this.doctor = data?.doctor;
          console.log(this.doctor);
          
          // If profile picture is available, set the image source
          if (data?.profilePicture) {
            // Prefix the base64 string with the appropriate image type (e.g., image/jpeg or image/png)
            this.selectedImageUrl = 'data:image/jpeg;base64,' + data.profilePicture;
          } else {
            this.selectedImageUrl = null; // Set to null if no profile picture is provided
          }
  
          this.populateForm(this.doctor);
        },
        (error) => {
          this.errorMessage = 'Failed to fetch patient details. Please try again later.';
          console.error('Error fetching patient data:', error);
        }
      );
    }
  }
  
  onSubmit(): void {
    if (this.editForm.valid) {
      const doctorData: DoctorDTO = this.editForm.value;
  
      const formData = new FormData();
      Object.keys(doctorData).forEach((key) => {
        if (key !== 'profilePicture') {
          formData.append(key, (doctorData as any)[key]);
        }
      });
  
      if (this.selectedImage) {
        formData.append('profilePicture', this.selectedImage);
      }
  
      // Append the selected specialty value (id) to the form data
      const selectedSpecialty = this.editForm.get('specialization')?.value;
      if (selectedSpecialty) {
        formData.append('specialization', selectedSpecialty); // Append the id or value directly
      }
  
      // Send the FormData to the backend service for saving
      this.doctorService.registerDoctor(formData).subscribe(
        (response) => {
          console.log('Doctor registered successfully!', response);
          this.isEditMode = false;
          this.router.navigate(['/doctor-main']);
        },
        (error) => {
          console.error('There was an error!', error);
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }
  
  
  onEdit() {
    this.isEditMode = true;
  }

  onCancel() {
    this.isEditMode = false;
  }
  getSpecialties(): void {
    this.patientService.getAllSpecialties().subscribe(
      (specialties) => {
        this.specialties = specialties;
      },
      (error: any) => {
        console.error('Error fetching specialties:', error);
      }
    );
  }
}
