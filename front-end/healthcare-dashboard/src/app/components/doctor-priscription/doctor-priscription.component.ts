import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { PrescriptionService } from '../../services/prescription.service';
import { AppointmentDTO } from '../../classes/appointment.model';
import { AppointmentService } from '../../services/appointment.service';
import { ArtifactUtils } from '../../util/util';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Prescription } from '../../classes/prescription.model';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'app-doctor-priscription',
  standalone: true,
  providers: [MessageService],
  imports: [
    TableModule,
    DialogModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    DropdownModule,
    ToastModule,
  ],
  templateUrl: './doctor-priscription.component.html',
  styleUrls: ['./doctor-priscription.component.scss'],
})
export class DoctorPriscriptionComponent implements OnInit {
  completedAppointments: AppointmentDTO[] = [];
  @Input() appointment: AppointmentDTO | null = null;
  displayPrescriptionDialog: boolean = false;
  prescriptionForm!: FormGroup;
  selectedAppointment: any;
  medications: any[] = [];
  dosages: any[] = [];
  addedMedications!: FormArray;
  token: string | null = null;
  prescriptionDetails: Prescription[] = [];

  constructor(
    private prescriptionService: PrescriptionService,
    private appointmentService: AppointmentService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private signupService: SignupService
  ) {}

  ngOnInit(): void {
    this.token = this.signupService.getAuthToken();
    console.log('Token:', this.token);
    if (this.token) {
      this.getDoctorCompletedAppointments();
      this.loadDoctorPrescription(); // Fetch doctor-specific completed appointments
    } else {
      console.log('No token found');
    }
    this.loadMedications();
    this.loadDosages();
    this.initializePrescriptionForm();
  }

  initializePrescriptionForm(): void {
    this.prescriptionForm = this.fb.group({
      medication: ['', Validators.required],
      dosage: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      instructions: [''],
      medications: this.fb.array([]), // Form array for medications
    });
    this.addedMedications = this.prescriptionForm.get(
      'medications'
    ) as FormArray;
  }

  getDoctorCompletedAppointments(): void {
    // const doctorId = localStorage.getItem('doctorId');

    if (this.token) {
      this.appointmentService.getDoctorAppointments(this.token).subscribe({
        next: (appointments: AppointmentDTO[]) => {
          // Filter completed appointments for the logged-in doctor
          this.completedAppointments = appointments.filter(
            (appointment) => appointment.status === 'COMPLETED'
          );
        },
        error: (error) => {
          console.error('Error fetching completed appointments:', error);
          ArtifactUtils.showErrorViaToast(
            this.messageService,
            'Failed to fetch completed appointments'
          );
        },
      });
    } else {
      ArtifactUtils.showErrorViaToast(
        this.messageService,
        'Doctor ID not found in local storage'
      );
    }
  }
  loadDoctorPrescription() {
    if (this.token) {
      this.prescriptionService.getDoctorPrescriptions(this.token).subscribe({
        next: (prescriptions: Prescription[]) => {
          this.prescriptionDetails = prescriptions; // Store the fetched prescriptions
          console.log('Fetched prescriptions:', this.prescriptionDetails);
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
        'Doctor ID not found in local storage'
      );
    }
  }

  openPrescriptionDialog(appointment: AppointmentDTO): void {
    this.selectedAppointment = appointment;
    this.displayPrescriptionDialog = true;

    // Set up basic patient and doctor information
    this.prescriptionForm.patchValue({
      patientName: appointment.patientName,
      patientId: appointment.patientId,
      doctorName: `Dr. ${appointment.doctor.firstName} ${appointment.doctor.lastName}`,
      doctorId: appointment.doctorId,
    });

    // Check if this appointment already has prescription data
    if (appointment.prescription && appointment.prescription.length > 0) {
      const prescription = appointment.prescription;

      // Clear any previous medications in the form array
      this.addedMedications.clear();

      // Loop through the medications and add them to the form
      prescription.forEach((med: Prescription) => {
        const medicationControl = this.fb.group({
          medicationName: [med.medicationName],
          dosage: [med.dosage],
          quantity: [med.quantity],
          morning: [med.morning],
          afternoon: [med.afternoon],
          night: [med.night],
          beforeFood: [med.beforeFood],
          afterFood: [med.afterFood],
          instructions: [med.instructions],
        });

        this.addedMedications.push(medicationControl);
      });

      // You can also pre-fill any additional data such as prescription instructions
      this.prescriptionForm.patchValue({
        instructions: prescription[0].instructions, // assuming instructions are the same for all medications
      });
    }
  }

// This method adds the medication to the list in the form but does not submit it to the API
addMedication(): void {
  if (this.prescriptionForm.valid) {
    const formValue = this.prescriptionForm.value;

    const medicationId = formValue.medication ? formValue.medication.id : null;
    const medicationName = formValue.medication ? formValue.medication.name : null;
    const dosageId = formValue.dosage ? formValue.dosage.id : null;
    const dosageName = formValue.dosage ? formValue.dosage.dosage : null;

    const medicationControl = this.fb.group({
      medicationId: [medicationId],
      medicationName: [medicationName],
      dosageId: [dosageId],
      dosageName: [dosageName],
      quantity: [formValue.quantity],
      morningBeforeFood: [false],
      morningAfterFood: [false],
      afternoonBeforeFood: [false],
      afternoonAfterFood: [false],
      nightBeforeFood: [false],
      nightAfterFood: [false],
      note: [''],
    });

    // Add to the form array, so it appears in the table.
    this.addedMedications.push(medicationControl);

    // Clear input fields for next medication.
    this.prescriptionForm.patchValue({
      medication: '',
      dosage: '',
      quantity: 1,
    });
  } else {
    ArtifactUtils.showErrorViaToast(this.messageService, 'Please fill out all fields correctly.');
  }
}

// This method submits the final prescription to the API
addPrescription(): void {
  if (this.selectedAppointment) {
    if (this.addedMedications.length === 0) {
      ArtifactUtils.showErrorViaToast(this.messageService, 'At least one medication must be added.');
      return;
    }

    // Prepare the medications data from the form
    const medications = this.addedMedications.value.map((med: any) => ({
      medicationId: med.medicationId,
      medicationName: med.medicationName,
      dosageId: med.dosageId,
      dosageName: med.dosageName,
      quantity: med.quantity,
      morningBeforeFood: med.morningBeforeFood,
      morningAfterFood: med.morningAfterFood,
      afternoonBeforeFood: med.afternoonBeforeFood,
      afternoonAfterFood: med.afternoonAfterFood,
      nightBeforeFood: med.nightBeforeFood,
      nightAfterFood: med.nightAfterFood,
      note: med.note,
    }));

    // Create the prescription object
    const newPrescription = {
      appointmentId: this.selectedAppointment.appointmentId,
      patientId: this.selectedAppointment.patient.id,
      doctorId: this.selectedAppointment.doctor.id,
      medications: medications,
      instructions: this.prescriptionForm.value.instructions,
      patientName: this.prescriptionForm.value.patientName,
      doctorName: this.prescriptionForm.value.doctorName,
      medication:this.prescriptionForm.value.medicationName,
      dosage:this.prescriptionForm.value.dosageName
    };

    // Make the API call to save the prescription
    this.prescriptionService.createPrescription(newPrescription).subscribe({
      next: () => {
        ArtifactUtils.showSuccessViaToast(this.messageService, 'Prescription added successfully');
        this.displayPrescriptionDialog = false;
        this.getDoctorCompletedAppointments(); // Refresh the appointments list
      },
      error: (error) => {
        ArtifactUtils.showErrorViaToast(this.messageService, 'Failed to add prescription');
        console.error('Error creating prescription', error);
      },
    });
  }
}


  increaseQuantity(): void {
    const currentQuantity = this.prescriptionForm.get('quantity')?.value;
    this.prescriptionForm.patchValue({ quantity: currentQuantity + 1 });
  }

  decreaseQuantity(): void {
    const currentQuantity = this.prescriptionForm.get('quantity')?.value;
    if (currentQuantity > 1) {
      this.prescriptionForm.patchValue({ quantity: currentQuantity - 1 });
    }
  }

  loadMedications(): void {
    this.prescriptionService.getMedicationOptions().subscribe(
      (data) => {
        this.medications = data.map((med) => ({
          id: med.id,
          name: med.name,
        }));
      },
      (error) => {
        console.error('Error fetching medications:', error);
      }
    );
  }

  loadDosages(): void {
    this.prescriptionService.getDosageOptions().subscribe(
      (data) => {
        this.dosages = data.map((dos) => ({
          id: dos.id,
          dosage: dos.dosage,
        }));
      },
      (error) => {
        console.error('Error fetching dosages:', error);
      }
    );
  }
}
