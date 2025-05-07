import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FamilyVisit } from '../../classes/familyVisit.model';
import { FamilyVisitService } from '../../services/family-visit.service';
import { Patient } from '../../classes/patients.model';
import { PatientService } from '../../services/patient.service';
import { SignupService } from '../../services/signup.service';
import { CommonModule, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-family-visit',
  standalone: true,
  providers:[DatePipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    DialogModule,
    RouterModule,
    ButtonModule,
    RadioButtonModule,
    DropdownModule,
  ],
  templateUrl: './family-visit.component.html',
  styleUrls: ['./family-visit.component.scss'],
})
export class FamilyVisitComponent implements OnInit {
  displayVisitDetailsDialog: boolean = false;
  statusMessage: string = '';
  upcomingVisits: FamilyVisit[] = [];
  patients: Patient[] = [];
  token: string | null = null;

  familyVisitForm: FormGroup;
  isEditMode: boolean = false;
  selectedVisit: FamilyVisit | null = null;

  constructor(
    private fb: FormBuilder,
    private familyVisitService: FamilyVisitService,
    private patientService: PatientService,
    private signupService: SignupService
  ) {
    // Initialize the form group
    this.familyVisitForm = this.fb.group({
      visitType: ['', Validators.required],
      visitDetails: ['', Validators.required],
      visitDate: ['', Validators.required],
      isOnline: [false],
      zoomLink: [''],
      patient: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.token = this.signupService.getAuthToken();
    this.loadPatientData();
    this.loadGuardianVisits();
  }

  loadPatientData(): void {
    if (this.token) {
      this.patientService.getPatientDetails(this.token).subscribe((data) => {
        const patient = data?.patient;
        if (patient) {
          this.patients = [patient];
        }
      });
    }
  }
  loadGuardianVisits(): void {
    this.familyVisitService.getGuardianVisits().subscribe(
      (visits: FamilyVisit[]) => {
        this.upcomingVisits = visits;
        console.log('Guardian Visits:', this.upcomingVisits);
      },
      (error) => {
        console.error('Error fetching guardian visits:', error);
        // Handle error appropriately, show a message, etc.
      }
    );
  }
  // Load scheduled family visits
  // loadScheduledVisits(): void {
  //   this.familyVisitService.getAllVisits().subscribe((data) => {
  //     this.upcomingVisits = data;
  //   });
  // }

  // Add a new visit (open dialog for creating)
  AddVisit(): void {
    this.displayVisitDetailsDialog = true;
    this.familyVisitForm.reset();
    this.isEditMode = false;
    this.selectedVisit = null;
  }

  // Edit an existing visit
  editVisit(visit: FamilyVisit): void {
    this.displayVisitDetailsDialog = true;
    this.isEditMode = true;
    this.selectedVisit = visit;

    // Pre-fill form with selected visit data
    this.familyVisitForm.patchValue({
      visitType: visit.visitType,
      visitDetails: visit.visitDetails,
      visitDate: visit.visitDate,
      isOnline: visit.isOnline,
      zoomLink: visit.zoomLink,
      patient: visit.patient,
    });
  }

  // Delete a visit
  deleteVisit(id: number): void {
    this.familyVisitService.deleteVisit(id).subscribe(() => {
      this.statusMessage = 'Visit deleted successfully!';
      this.upcomingVisits = this.upcomingVisits.filter((visit) => visit.id !== id);
      setTimeout(() => (this.statusMessage = ''), 3000);
    });
  }

  // Schedule or update a visit
  // saveVisit(): void {
  //   if (this.familyVisitForm.invalid) {
  //     return;
  //   }

  //   const formData = this.familyVisitForm.value;

  //   if (this.isEditMode && this.selectedVisit) {
  //     // Update existing visit
  //     formData.id = this.selectedVisit.id;
  //     this.familyVisitService.createVisit(formData).subscribe((updatedVisit) => {
  //       const index = this.upcomingVisits.findIndex((v) => v.id === updatedVisit.id);
  //       this.upcomingVisits[index] = updatedVisit;
  //       this.statusMessage = 'Visit updated successfully!';
  //       this.closeDialog();
  //     });
  //   } else {
  //     // Create new visit
  //     this.familyVisitService.createVisit(formData).subscribe((newVisit) => {
  //       this.upcomingVisits.push(newVisit);
  //       this.statusMessage = 'Visit created successfully!';
  //       this.closeDialog();
  //     });
  //   }
  // }
  saveVisit(): void {
    if (this.familyVisitForm.invalid) {
      return;
    }
  
    const formData = this.familyVisitForm.value;
  
    if (this.isEditMode && this.selectedVisit) {
      // Update existing visit
      formData.id = this.selectedVisit.id;
      this.familyVisitService.createVisit(formData).subscribe((updatedVisit) => {
        const index = this.upcomingVisits.findIndex((v) => v.id === updatedVisit.id);
        this.upcomingVisits[index] = updatedVisit;
        this.statusMessage = 'Visit updated successfully!';
        this.closeDialog();
      });
    } else {
      // Create new visit
      this.familyVisitService.createVisit(formData).subscribe((newVisit) => {
        this.upcomingVisits.push(newVisit);
        this.statusMessage = 'Visit created successfully!';
        this.closeDialog();
      });
    }
  }
  
  // Close dialog
  closeDialog(): void {
    this.displayVisitDetailsDialog = false;
    this.familyVisitForm.reset();
    this.isEditMode = false;
    this.selectedVisit = null;
    setTimeout(() => (this.statusMessage = ''), 3000);
  }
}
