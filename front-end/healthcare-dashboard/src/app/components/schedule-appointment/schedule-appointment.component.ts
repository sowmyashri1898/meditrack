import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DoctorDTO } from '../../classes/doctor.model';
import { Speciality } from '../../classes/speciality.model';
import { AppointmentDTO } from '../../classes/appointment.model';
import { AppointmentService } from '../../services/appointment.service';
import { PatientService } from '../../services/patient.service';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterModule } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-schedule-appointment',
  standalone: true,
  providers: [DatePipe],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    DropdownModule,
    MultiSelectModule,
    CalendarModule,
    SelectButtonModule,
    InputTextModule,
    FormsModule,
    
],
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.scss'],
})
export class ScheduleAppointmentComponent implements OnInit {
  appointmentForm!: FormGroup;
  doctors: DoctorDTO[] = [];
  specialties: Speciality[] = [];
  availableLocations: any[] = [];
  availableHospitals: any[] = [];
  appointmentTypes = [
    { label: 'Online', value: 'ONLINE' },
    { label: 'Offline', value: 'OFFLINE' },
  ];
  notifications: string[] = [];
  currentDate: Date;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private datePipe: DatePipe,
    private router:Router,
    private notificationService:NotificationService
  ) {
    this.currentDate = new Date();

  }

  ngOnInit(): void {
    this.createForm();
    this.getSpecialties();
  }

  createForm() {
    this.appointmentForm = this.fb.group({
      specialty: ['', Validators.required],
      doctorName: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required],
      hospitalName: ['', Validators.required],
      appointmentType: ['', Validators.required],
      reason:['',Validators.required],
      notes:['',Validators.required]
    });
  }

submitAppointment() {
  if (this.appointmentForm.valid) {
    const formValue = this.appointmentForm.value;
    const appointment: AppointmentDTO = new AppointmentDTO();

    // Map form values to the appointment object
    appointment.doctorId = formValue.doctorName?.id;
    appointment.doctorName = formValue.doctorName?.firstName;
    appointment.symptomId = formValue.symptomId;
    appointment.location = formValue.location;
    appointment.hospitalName = formValue.hospitalName;
    appointment.appointmentType = formValue.appointmentType?.value; // Extracting value
    appointment.specialty = formValue.specialty?.value;

    // Format appointment date and time
    const formattedDate = this.datePipe.transform(
      formValue.appointmentDate,
      'yyyy-MM-dd'
    );
    const time = formValue.time; // 'HH:mm'
    if (formattedDate && time) {
      appointment.appointmentDate = `${formattedDate}T${time}:00`;
      appointment.appointmentTime = time;
    } else {
      console.error('Date or time is missing.');
      return;
    }

    // Set default values
    appointment.status = formValue.status?.toUpperCase() || 'SCHEDULED';
    appointment.reason = formValue.reason;
    appointment.notes = formValue.notes;
    appointment.reasonForVisit = formValue.reasonForVisit;

    // Call API to create an appointment
    this.appointmentService.createAppointment(appointment).subscribe(
      (response) => {
        console.log('Appointment scheduled successfully:', response);

        // Send notifications to both patient and doctor
        this.notificationService.sendNotification(
          appointment.patientId,
          `Your appointment with Dr. ${appointment.doctorName} has been scheduled for ${appointment.appointmentDate}.`
        );
        this.notificationService.sendNotification(
          appointment.doctorId,
          `You have a new appointment scheduled for ${appointment.appointmentDate}.`
        );

        // Navigate after success
        this.router.navigate(['/navbar/home']);
      },
      (error) => {
        console.error('Error scheduling appointment:', error);

        // Send failure notification to patient
        this.notificationService.sendNotification(
          appointment.patientId,
          'Failed to schedule your appointment. Please try again later.'
        );
      }
    );
  }
}

  

  onHideAppointment() {
    this.appointmentForm.reset();
  }

  getSpecialties(): void {
    this.patientService.getAllSpecialties().subscribe(
      (specialties: Speciality[]) => {
        this.specialties = specialties; // Directly set the array without modifying its structure
      },
      (error: any) => {
        console.error('Error fetching specialties:', error);
      }
    );
  }

  getDoctors(): void {
    const selectedSpecialty = this.appointmentForm.get('specialty')?.value;

    if (selectedSpecialty) {
      this.patientService.getDoctorsBySpecialty(selectedSpecialty).subscribe(
        (doctors) => {
          this.doctors = doctors;

          // Check if `doctors` array is populated correctly
          if (this.doctors.length > 0) {
            console.log('Doctors:', this.doctors);

            // Extract unique locations and hospitals
            this.availableLocations = Array.from(
              new Set(this.doctors.map((doctor: DoctorDTO) => doctor.location))
            );
            this.availableHospitals = Array.from(
              new Set(
                this.doctors.map((doctor: DoctorDTO) => doctor.hospitalName)
              )
            );
          } else {
            console.warn('No doctors found for the selected specialty.');
            this.availableLocations = [];
            this.availableHospitals = [];
          }
        },
        (error) => {
          console.error('Error fetching doctors:', error);
          this.doctors = [];
          this.availableLocations = [];
          this.availableHospitals = [];
        }
      );
    } else {
      console.error('No valid specialty selected.');
    }
  }
}
