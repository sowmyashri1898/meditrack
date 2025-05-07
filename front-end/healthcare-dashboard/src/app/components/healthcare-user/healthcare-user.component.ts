import { Component, OnInit } from '@angular/core';
import { HealthcareServiceService } from '../../services/healthcare-service.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { Table, TableModule } from 'primeng/table';
import { HealthcareUser } from '../../classes/healthcareUser.model';
import { UserRole } from '../../classes/userRole.model';
import { UserStatus } from '../../classes/userstatus.model';
import { CalendarModule } from 'primeng/calendar';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-healthcare-user',
  standalone: true,
  imports: [RouterModule,CommonModule,ReactiveFormsModule,DialogModule,InputTextModule,
    CardModule,ButtonModule,DropdownModule,TableModule,FormsModule,CalendarModule],
  templateUrl: './healthcare-user.component.html',
  styleUrl: './healthcare-user.component.scss'
})
export class HealthcareUserComponent implements OnInit{
  healthcareUsers: HealthcareUser[] = [];
  selectedUser: HealthcareUser = new HealthcareUser();
  displayDialog: boolean = false;
  healthcareUserForm!:FormGroup;
  userRoles = Object.values(UserRole);  // Enum values for roles
  userStatuses = Object.values(UserStatus); 
isEditMode: boolean = false;
  constructor(private healthcareUserService: HealthcareServiceService,private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loadHealthcareUsers();
    this.healthcareUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      profilePicture: [''],
      status: ['', Validators.required],
      role: ['', Validators.required],
      createdAt: ['', Validators.required],
      updatedAt: ['', Validators.required]
    });
    if (this.selectedUser) {
      this.healthcareUserForm.patchValue(this.selectedUser); // Pre-fill the form if editing
    }
  }

  loadHealthcareUsers() {
    this.healthcareUserService.getHealthcareUsers().subscribe((data: HealthcareUser[]) => {
      this.healthcareUsers = data;
    });
  }

  showDialogToAdd() {
    this.selectedUser = new HealthcareUser(); // Reset the form for a new user
    this.displayDialog = true;
  }

  onSubmit(): void {
    if (this.healthcareUserForm.invalid) {
      return; // Do not submit if the form is invalid
    }

    // Prepare the data to send to the backend
    const formData: HealthcareUser = this.healthcareUserForm.value;

    if (this.selectedUser?.userId) {
      // If user is selected, it's an update
      this.updateHealthcareUser(formData);
    } else {
      // If no user is selected, it's a new user
      this.addHealthcareUser(formData);
    }
  }

  // Method to save a new healthcare user
  addHealthcareUser(healthcareUser: HealthcareUser): void {
    this.healthcareUserService.addHealthcareUser(healthcareUser).subscribe(
      (response) => {
        console.log('Healthcare User saved successfully:', response);
        // Optionally, you can reset the form or close the dialog here
        this.healthcareUserForm.reset();
      },
      (error) => {
        console.error('Error saving healthcare user:', error);
      }
    );
  }

  // Method to update an existing healthcare user
  updateHealthcareUser(healthcareUser: HealthcareUser): void {
    this.healthcareUserService.updateHealthcareUser(healthcareUser).subscribe(
      (response) => {
        console.log('Healthcare User updated successfully:', response);
        // Optionally, you can reset the form or close the dialog here
        this.healthcareUserForm.reset();
      },
      (error) => {
        console.error('Error updating healthcare user:', error);
      }
    );
  }

  edit(user: HealthcareUser) {
    this.selectedUser = { ...user };
    this.displayDialog = true;
  }

  delete(user: HealthcareUser) {
    this.healthcareUserService.deleteHealthcareUser(user.userId).subscribe(() => {
      this.loadHealthcareUsers(); // Reload after deletion
    });
  }
  // onSubmit(): void {
  //   if (this.healthcareUserForm.valid) {
  //     console.log('Form Submitted:', this.healthcareUserForm.value);

  //     // Here you would typically send the form data to the backend API or service
  //     // Assuming a service handles submission (e.g., save to database or API endpoint)
      
  //     // Navigate to a different route after successful form submission
  //     this.router.navigate(['/dashboard']);  // Change the route as needed

  //     // Optionally reset the form after submission
  //     this.healthcareUserForm.reset();
  //   } else {
  //     // If form is invalid, mark all fields as touched to show validation messages
  //     this.healthcareUserForm.markAllAsTouched();
  //   }
  // }
  get formControls() {
    return this.healthcareUserForm.controls;
  }
  closeDialog(){

  }

}
