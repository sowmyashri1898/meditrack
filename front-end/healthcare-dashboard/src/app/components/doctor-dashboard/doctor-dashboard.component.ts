import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { RouterModule } from '@angular/router';
import { AppointmentDTO } from '../../classes/appointment.model';
import { MessageService } from 'primeng/api';
import { SignupService } from '../../services/signup.service';
import { ArtifactUtils } from '../../util/util';
import { AppointmentService } from '../../services/appointment.service';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  providers:[MessageService,DatePipe],
  imports: [MatCardModule, CommonModule, RouterModule,BreadcrumbModule],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.scss',
})
export class DoctorDashboardComponent implements OnInit {
  token: string | null = null;

  upcomingAppointments!: AppointmentDTO[];
  constructor(
    private messageService: MessageService,
    public datePipe: DatePipe,
    private signupService: SignupService,
    private appointmentService:AppointmentService
  ) {}
  ngOnInit(): void {
    this.token = this.signupService.getAuthToken();
    this.loadDoctorAppointments();
  }
    loadDoctorAppointments(): void {
        if (this.token) {
          this.appointmentService.getDoctorAppointments(this.token).subscribe(
            (appointments: AppointmentDTO[]) => {
              const currentDate = new Date();
              this.upcomingAppointments = appointments.filter((appointment) => new Date(appointment.appointmentDate) >= currentDate);
            },
            (error) => {
              console.error('Error fetching patient appointments:', error);
              ArtifactUtils.showErrorViaToast(this.messageService, 'Failed to load your appointments. Please try again.');
            }
          );
        }
      }
}
