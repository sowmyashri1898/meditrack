import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../classes/patients.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { SignupComponent } from '../signup/signup.component';
import { SignupService } from '../../services/signup.service';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-patient-registration',
  standalone: true,
  providers:[DatePipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ButtonModule,
    RouterModule,
    CalendarModule,
    MatIconModule,
    DropdownModule,
  ],
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.scss'],
})
export class PatientRegistrationComponent implements OnInit, AfterViewInit {
  patientForm!: FormGroup;
  isEditMode = false;
  patientDetails: Array<{ icon: string, label: string, value: any }> = [];

  genderList = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];
  selectedImage: File | null = null;
  selectedImageUrl: string | ArrayBuffer | null = null; 
  patientId: number | null = null;
  patient: any = {};
  latestPatient: any;
  errorMessage!: string;
  token: string | null = null;
  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private route: ActivatedRoute, 
    private router: Router,
    private signupService: SignupService,
    private cdr: ChangeDetectorRef

  ) {}
  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      const authToken = localStorage.getItem('authToken');
      // Proceed with the logic using authToken
    }
  }
  patient$!: Observable<any>;
  // guardians = [
  //   { id: 1, name: 'John Doe' },
  //   { id: 2, name: 'Jane Smith' },
  //   { id: 3, name: 'Robert Brown' },
  // ];
  events = [
    { id: 101, name: 'Yoga Session' },
    { id: 102, name: 'Art Therapy' },
    { id: 103, name: 'Cooking Class' },
  ];
  ngOnInit(): void {
        this.token = this.signupService.getAuthToken();

    this.patient$ = this.patientService.getPatientDetails(this.token);

    console.log('Token:', this.token);
    if (this.token) {
      this.loadPatientData();
    } else {
      console.log('No token found');
    }

    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      // dob: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', Validators.required],
      address: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      bloodPressure: [''],
      heartRate: [''],
      temperature: [''],
      allergies: [''],
      currentMedications: [''],
      previousDiseases: [''],
      dietaryPreferences: [''],
      isResident: ['', Validators.required],
      roomNumber: [''],
      guardian: this.fb.group({
        guardianFirstName: ['', Validators.required],
        guardianLastName: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        guardianEmail: ['', [Validators.required, Validators.email]],
        relationship: ['', Validators.required],
      })
    });
    this.loadPatientData();
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.patientId = params['id'];
        if (this.patientId) {
          // this.loadPatientData(this.patientId);
        }
      }
    });
    console.log('Patient Data:', this.patient);
  }
  onEdit() {
    this.isEditMode = true;
  }
 
  loadPatientData(): void {
    if (this.token) {
      this.patientService.getPatientDetails(this.token).subscribe(
        (data) => {
          console.log('Data received:', data);
  
          // Extract patient and guardian details
          const patient = data?.latestPatient || {}; // Use empty object as fallback
          const guardian = data?.guardianDetails || {}; // Use empty object as fallback
  
          // Log the data for debugging
          console.log('Patient Data:', patient);
          console.log('Guardian Data:', guardian);
  
          // Combine patient and guardian data for patching the form
          this.patient = { ...patient, guardian }; // Nest guardian inside patient for easy access
  
          // If there's a profile picture
          if (data?.profilePicture) {
            this.selectedImageUrl = `data:image/jpeg;base64,${data.profilePicture}`;
          } else {
            this.selectedImageUrl = null;
          }
  
          // Convert isResident from "Yes"/"No" to boolean
          const isResidentBoolean = patient.isResident === "Yes" ? false : true;
  
          // Patch patient data to the form
          this.patientForm.patchValue({
            ...patient,
            isResident: isResidentBoolean, // Patch with the converted boolean value
            guardian: { ...guardian } // Patch guardian fields separately inside the form
          });
  
          // Populate patientDetails array for display
          this.patientDetails = [
            { icon: 'email', label: 'Email', value: patient?.email || 'Not available' },
            { icon: 'phone', label: 'Phone', value: patient?.contactNumber || 'Not available' },
            { icon: 'location_on', label: 'Location', value: patient?.address || 'Not available' },
            { icon: 'balance', label: 'Height', value: `${patient?.height || 'N/A'} cm` },
            { icon: 'fitness_center', label: 'Weight', value: `${patient?.weight || 'N/A'} kg` },
            { icon: 'fitness_center', label: 'Heart Rate', value: patient?.heartRate || 'Not available' },
            { icon: 'local_hospital', label: 'Blood Pressure', value: patient?.bloodPressure || 'Not available' },
            { icon: 'local_hospital', label: 'Temperature', value: patient?.temperature || 'Not available' },
            { icon: 'favorite', label: 'Allergies', value: patient?.allergies || 'Not available' },
            { icon: 'favorite', label: 'Current Medications', value: patient?.currentMedications || 'Not available' },
            { icon: 'favorite', label: 'Previous Diseases', value: patient?.previousDiseases || 'Not available' },
          ];
  
          // Detect changes (if necessary)
          this.cdr.detectChanges();
        },
        (error) => {
          this.errorMessage = 'Failed to fetch patient details. Please try again later.';
          console.error('Error fetching patient data:', error);
        }
      );
    } else {
      this.errorMessage = 'No token found. Please log in again.';
    }
  }
  
  
  // loadGuardians() {
  //   this.guardianService.getGuardians().subscribe(data => {
  //     this.guardians = data;
  //   });
  // }

  // loadEvents() {
  //   this.eventService.getEvents().subscribe(data => {
  //     this.events = data;
  //   });
  // }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImageUrl = reader.result; // Display the selected image preview
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      const patientData: any = this.patientForm.value;
      const formData = new FormData();
  
      // Convert patientDTO object to JSON string
      const patientDTOString = JSON.stringify(patientData);
  
      // Append the patientDTO JSON string to the formData
      formData.append('patientDTO', patientDTOString);
  
      // Append image if selected
      if (this.selectedImage) {
        formData.append('patientImage', this.selectedImage);
      }
  
      // Send the FormData to the backend
      this.patientService.registerPatient(formData).subscribe(
        (response) => {
          console.log('Patient registered successfully!', response);
          this.router.navigate(['/navbar/home']);
        },
        (error) => {
          console.error('There was an error!', error);
          this.errorMessage = 'Failed to register patient. Please try again.';
        }
      );
    } else {
      console.log('Form is not valid');
      this.errorMessage = 'Please fill all required fields correctly.';
    }
  }
  
  
  
  onCancel() {
    this.isEditMode = false;
  }
  onClear(): void {
    this.patientForm.reset();
    this.selectedImage = null;
    this.selectedImageUrl = null;  }

  goBack(): void {
    this.router.navigate(['navbar/home']); // Navigate back to the patient list or another route
  }
}
