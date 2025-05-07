import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { GuardianDTO } from '../../classes/guardian.model';
import { GuardianService } from '../../services/guardian.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupService } from '../../services/signup.service';
import { PatientService } from '../../services/patient.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-guardian-profile',
  standalone: true,
  imports: [RouterModule,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './guardian-profile.component.html',
  styleUrl: './guardian-profile.component.scss'
})
export class GuardianProfileComponent implements OnInit{
  guardianForm: FormGroup;
  token: string | null = null;
patient$!: Observable<any>;
  constructor(
    private guardianService: GuardianService,  // Inject GuardianService
    private formBuilder: FormBuilder,
    private router: Router,
    private signupService : SignupService,
    private patientService:PatientService
  ) {
    this.guardianForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email]],
      relationship: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.token = this.signupService.getAuthToken();
    this.loadPatientData();
    this.patient$ = this.patientService.getPatientDetails(this.token); 
   }
   loadPatientData(): void {
    if (this.token) {
      this.patientService.getPatientDetails(this.token).subscribe(
        (data) => {
          console.log('Data received:', data);
  
          const patient = data?.latestPatient || {}; // Use empty object as fallback
          const guardian = data?.guardianDetails || {}; // Use empty object as fallback
  
          // Log the data for debugging
          console.log('Patient Data:', patient);
          console.log('Guardian Data:', guardian);
  
          // Combine patient and guardian data for patching the form
          // this.patient = { ...patient, guardian }; // Nest guardian inside patient for easy access
  
          // // If there's a profile picture
          // if (data?.profilePicture) {
          //   this.selectedImageUrl = `data:image/jpeg;base64,${data.profilePicture}`;
          // } else {
          //   this.selectedImageUrl = null;
          // }
  
          // Convert isResident from "Yes"/"No" to boolean
          const isResidentBoolean = patient.isResident === "Yes" ? false : true;
  
    });   // Patch patient data to the form
         
    }
  }
  // On form submission
  onSubmit(): void {
    if (this.guardianForm.valid) {
      // Extract the form data as a plain object
      const guardianData = {
        firstName: this.guardianForm.value.firstName,
        lastName: this.guardianForm.value.lastName,
        contactNumber: this.guardianForm.value.contactNumber,
        email: this.guardianForm.value.email,
        relationship: this.guardianForm.value.relationship,
      };
  
      // Call the service with the JSON object
      this.guardianService.registerGuardian(guardianData).subscribe(
        (response) => {
          console.log('Guardian registered successfully', response);
          this.router.navigate(['/dashboard']); // Redirect to dashboard or another page
        },
        (error) => {
          console.error('Error registering guardian', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  
}
