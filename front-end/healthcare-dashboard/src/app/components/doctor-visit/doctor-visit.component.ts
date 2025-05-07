import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentDTO } from '../../classes/appointment.model';
import { ArtifactUtils } from '../../util/util';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'app-doctor-visit',
  standalone: true,
  providers:[MessageService,DatePipe],
  imports: [MatCard, MatCardHeader, 
    MatCardTitle, MatCardSubtitle, 
    MatCardContent, CommonModule,
  ],
  templateUrl: './doctor-visit.component.html',
  styleUrl: './doctor-visit.component.scss'
})
export class DoctorVisitComponent implements OnInit {
  upcomingAppointments: any[] = [];  // Initialize as an empty array
  token: string | null = null;

  constructor(
    private appointmentService: AppointmentService,
    private messageService: MessageService,
    private router: Router,
    private datepipe:DatePipe,
    private signupService: SignupService,
    private cdr: ChangeDetectorRef  // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.token = this.signupService.getAuthToken();
    this.loadPatientAppointments();
  }

  bookAppointment() {
    this.router.navigate(['navbar/schedule-appointment']);
  }

  loadPatientAppointments(): void {
    if (this.token) {
      this.appointmentService?.getPatientAppointments(this.token).subscribe(
        (appointments: AppointmentDTO[]) => {
          const currentDate = new Date();

          // Helper function to parse appointment date
          const parseAppointmentDate = (appointmentDate: any): Date | null => {
            let appointmentDateArray: number[] = [];
            if (typeof appointmentDate === 'string') {
              try {
                appointmentDateArray = JSON.parse(appointmentDate);
              } catch (error) {
                console.error('Error parsing appointmentDate string:', appointmentDate, error);
                return null;
              }
            } else if (Array.isArray(appointmentDate)) {
              appointmentDateArray = appointmentDate;
            } else {
              console.error('Unexpected format for appointmentDate:', appointmentDate);
              return null;
            }

            const [year, month, day, hours, minutes] = appointmentDateArray;
            return new Date(year, month - 1, day, hours, minutes);
          };

          // Transform appointments with formatted date
          const transformAppointments = (appointments: AppointmentDTO[], filterFn: (date: Date) => boolean) =>
            appointments
              .map((appointment) => {
                const appointmentDate = parseAppointmentDate(appointment.appointmentDate);
                return appointmentDate
                  ? {
                      ...appointment,
                      appointmentDate,
                      formattedDate: this.datepipe.transform(appointmentDate, 'MMM d, y, h:mm a'), // Format: Jan 22, 2025, 4:30 PM
                    }
                  : null;
              })
              .filter((appointment) => appointment && filterFn(appointment.appointmentDate as Date));

          // Separate upcoming and past appointments
          this.upcomingAppointments = transformAppointments(appointments, (date) => date >= currentDate);

          console.log('Upcoming Appointments:', this.upcomingAppointments);

        
        }
        
      );
    }
  }
  
}
