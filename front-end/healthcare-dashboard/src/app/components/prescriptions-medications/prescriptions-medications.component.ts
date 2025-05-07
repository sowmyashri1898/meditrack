import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { Prescription } from '../../classes/prescription.model';
import { ArtifactUtils } from '../../util/util';
import { PrescriptionService } from '../../services/prescription.service';
import { MessageService } from 'primeng/api';
import { SignupService } from '../../services/signup.service';
import { MatList, MatListItem } from '@angular/material/list';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-prescriptions-medications',
  standalone: true,
  providers:[MessageService],
  imports: [RouterModule,
    SidebarModule,
    MenuModule,
    ButtonModule,
    ToolbarModule,
    CommonModule,
    CardModule,
    PanelModule,
    ReactiveFormsModule,
    DialogModule, FormsModule,
    CalendarModule, DropdownModule,TableModule,MatList,MatListItem,TabViewModule],
  templateUrl: './prescriptions-medications.component.html',
  styleUrl: './prescriptions-medications.component.scss'
})
export class PrescriptionsMedicationsComponent implements OnInit{
  token: string | null = null;
  prescriptionDetails!: Prescription[];
  // activePrescriptions = [
  //   { name: 'Lisinopril', dosage: '10mg', frequency: 'Once a day', refillDate: new Date('2024-12-01') },
  //   { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once a day', refillDate: new Date('2024-12-10') },
  //   { name: 'Metformin', dosage: '500mg', frequency: 'Twice a day', refillDate: new Date('2024-12-05') },
  // ];

  // // Data for Prescription History
  // prescriptionHistory = [
  //   { name: 'Amlodipine', dosage: '5mg', startDate: new Date('2022-03-01'), endDate: new Date('2023-02-01'), discontinuationReason: 'High blood pressure controlled' },
  //   { name: 'Omeprazole', dosage: '20mg', startDate: new Date('2022-01-15'), endDate: new Date('2023-01-01'), discontinuationReason: 'Stopped after ulcer healed' }
  // ];

  medicationReminders = [
    { name: 'Lisinopril', time: '8:00 AM' },
    { name: 'Atorvastatin', time: '8:00 AM' },
    { name: 'Metformin', time: '8:00 AM' }
  ];
  medicationList: any[] = []; // Flat list of medications for Tab 2


  
  constructor(private prescriptionService:PrescriptionService,
    private signupService:SignupService
    ,private messageService:MessageService) { }

  ngOnInit(): void {
    this.token = this.signupService.getAuthToken();

    if(this.token){
    this.loadPatientPrescription();
    }
  }
  loadPatientPrescription() {
    if (this.token) {
      this.prescriptionService.getPatientPrescriptions(this.token).subscribe({
        next: (prescriptions: Prescription[]) => {
          this.prescriptionDetails = prescriptions; // Store prescriptions for Tab 1
          console.log('Fetched prescriptions:', this.prescriptionDetails);
  
          // Flatten the medications for Tab 2
          this.medicationList = prescriptions;
          console.log('Flattened medications:', this.medicationList);
        },
        error: (error) => {
          console.error('Error fetching prescription details:', error);
          ArtifactUtils.showErrorViaToast(
            this.messageService,
            'Failed to fetch prescription details'
          );
        },
      });
    } else {
      ArtifactUtils.showErrorViaToast(
        this.messageService,
        'Patient ID not found in local storage'
      );
    }
  }
  // Function to handle refill requests
  requestRefill(prescription: any) {
    
    alert(`Refill requested for ${prescription?.medication?.medicationName}`);
  }
  takeMedication(medication: Prescription): void {
    alert(`You have taken: ${medication.medicationName}`);
    // Add any additional logic for marking medication as taken
  }
  
}

