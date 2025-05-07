import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { SignupService } from '../../services/signup.service';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentDTO } from '../../classes/appointment.model';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { ToolbarModule } from 'primeng/toolbar';
import { ArtifactUtils } from '../../util/util';
import { MessageService } from 'primeng/api';
import { Participant } from '../../classes/participants.model';
import { CommonModule, DatePipe } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor-appointment',
  standalone: true,
  providers: [MessageService,DatePipe],
  imports: [
    MatListModule,
    DatePipe,
    CommonModule,
    RouterModule,
    TableModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MenuModule,
    ToolbarModule,
    ToastModule,
    CardModule,
    CalendarModule,
    DropdownModule,
  ],
  templateUrl: './doctor-appointment.component.html',
  styleUrl: './doctor-appointment.component.scss',
})
export class DoctorAppointmentComponent implements OnInit {


  chatMessages: string[] = [];
  newMessage: string = '';

  isTranslatorActive: boolean = false;
  isChatVisible: boolean = false;
  isMuted: boolean = false;
  isVideoActive: boolean = true;

  token: string | null = null;
  upcomingAppointments: AppointmentDTO[] = [];
  selectedAppointment!: AppointmentDTO;  // Holds the selected appointment
  displayDetailsDialog: boolean = false;
  pastAppointments: AppointmentDTO[] = [];  // List for past appointments
  displayVideoDialog: boolean = false;
  participants: Participant[] = [];
  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>;

  localStream!: MediaStream;

  constructor(
    private signupService: SignupService,
    private appointmentService: AppointmentService,
    private toastr: MessageService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.token = this.signupService.getAuthToken();
    console.log('Token:', this.token);
    if (this.token) {
      this.loadDoctorAppointments();
    } else {
      console.log('No token found');
    }
  }

  loadDoctorAppointments(): void {
    if (this.token) {
      this.appointmentService.getDoctorAppointments(this.token).subscribe(
        (appointments: AppointmentDTO[]) => {
          // Separate past and upcoming appointments based on the appointment date
          const currentDate = new Date();
          this.upcomingAppointments = appointments.filter((appointment) => new Date(appointment.appointmentDate) >= currentDate);
          this.pastAppointments = appointments.filter((appointment) => new Date(appointment.appointmentDate) < currentDate);

          console.log('Upcoming appointments:', this.upcomingAppointments);
          console.log('Past appointments:', this.pastAppointments);
        },
        (error) => {
          console.error('Error fetching patient appointments:', error);
        }
      );
    }
  }

  viewAppointmentDetails(appointment: AppointmentDTO): void {
    this.selectedAppointment = appointment;
    this.displayDetailsDialog = true;
  }

  // cancelAppointment(appointmentId: number): void {
  //   if (appointmentId !== undefined && appointmentId !== null) {
  //     this.appointmentService.deleteAppointment(appointmentId).subscribe({
  //       next: () => {
  //         // Set appointment status to 'CANCELLED'
  //         const cancelledAppointment = this.upcomingAppointments.find((app) => app.appointmentId === appointmentId);
  //         if (cancelledAppointment) {
  //           cancelledAppointment.status = 'CANCELLED';
  //         }

  //         // Move cancelled appointment to past appointments
  //         const appointmentToMove = this.upcomingAppointments.find((app) => app.appointmentId === appointmentId);
  //         if (appointmentToMove) {
  //           this.pastAppointments.push(appointmentToMove);
  //           this.upcomingAppointments = this.upcomingAppointments.filter(
  //             (appointment) => appointment.appointmentId !== appointmentId
  //           );
  //         }

  //         ArtifactUtils.showSuccessViaToast(this.toastr, 'Appointment cancelled successfully!');
  //       },
  //       error: (error) => {
  //         console.error('Error deleting appointment with ID:', appointmentId, error);
  //         ArtifactUtils.showErrorViaToast(this.toastr, 'Failed to cancel appointment. Please try again.');
  //       },
  //     });
  //   } else {
  //     console.error('Invalid appointment ID');
  //     ArtifactUtils.showErrorViaToast(this.toastr, 'Invalid appointment ID');
  //   }
  // }
  cancelAppointment(appointmentId: number): void {
    if (appointmentId !== undefined && appointmentId !== null) {
      this.appointmentService.cancelAppointment(appointmentId).subscribe({
        next: (updatedAppointment) => {
          // Update the status and 'active' flag locally after a successful response
          const cancelledAppointment = this.upcomingAppointments.find((app) => app.appointmentId === appointmentId);
          if (cancelledAppointment) {
            cancelledAppointment.status = 'CANCELLED';
            cancelledAppointment.active = false;  // Mark as inactive locally
          }
  
          // Optionally, move cancelled appointment to past appointments
          this.pastAppointments.push(cancelledAppointment!);
          this.upcomingAppointments = this.upcomingAppointments.filter(
            (appointment) => appointment.appointmentId !== appointmentId
          );
  
          ArtifactUtils.showSuccessViaToast(this.toastr, 'Appointment cancelled successfully!');
        },
        error: (error) => {
          console.error('Error cancelling appointment with ID:', appointmentId, error);
          ArtifactUtils.showErrorViaToast(this.toastr, 'Failed to cancel appointment. Please try again.');
        },
      });
    } else {
      console.error('Invalid appointment ID');
      ArtifactUtils.showErrorViaToast(this.toastr, 'Invalid appointment ID');
    }
  }
  
  async startVideoCall(appointment: AppointmentDTO): Promise<void> {
    if (appointment.status !== 'CANCELLED') {
      this.selectedAppointment = appointment;  // Store the selected appointment
      this.displayVideoDialog = true;
      await this.setupLocalVideo();
      this.setupRoom(appointment);
    }
  }

  setupRoom(appointment: AppointmentDTO): void {
    this.participants = [{ name: 'You', videoStream: this.localStream }];
    if (appointment && appointment.patientName) {
      const remoteStream = new MediaStream();
      this.participants.push({
        name: appointment.patientName,
        videoStream: remoteStream,
      });
      console.log('Remote participant added:', appointment.patientName);
    }
  }

  async setupLocalVideo(): Promise<void> {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (this.localVideo) {
        this.localVideo.nativeElement.srcObject = this.localStream;
      }
      this.isVideoActive = true;
    } catch (err) {
      console.error('Error accessing local media: ', err);
      ArtifactUtils.showErrorViaToast(
        this.toastr,
        'Error accessing your camera or microphone. Please check your device permissions.'
      );
    }
  }

  stopLocalVideo(): void {
    if (this.localStream) {
      const tracks = this.localStream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  }

  hideVideoDialog(): void {
    this.displayVideoDialog = false;
    this.stopLocalVideo();
  }

  toggleMute(): void {
    if (this.localStream) {
      const audioTrack = this.localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        this.isMuted = !audioTrack.enabled;
      }
    }
  }

  toggleVideo(): void {
    if (this.localStream) {
      const videoTrack = this.localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        this.isVideoActive = !videoTrack.enabled;
      }
    }
  }

  toggleChat(): void {
    this.isChatVisible = !this.isChatVisible;
  }

  toggleTranslator(): void {
    this.isTranslatorActive = !this.isTranslatorActive;
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.chatMessages.push(this.newMessage);
      this.newMessage = '';
    }
  }

  leaveCall(): void {
    this.displayVideoDialog = false;
    this.stopLocalVideo();
    this.leaveRoom();
    this.participants = [];

    // After leaving the call, update the appointment status to "Completed"
    if (this.selectedAppointment && this.selectedAppointment.appointmentId) {
      this.updateAppointmentStatusToCompleted(this.selectedAppointment.appointmentId);
    }
  }

  leaveRoom(): void {
    console.log('Room left');
  }

  async startScreenShare(): Promise<void> {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      if (this.localVideo) {
        this.localVideo.nativeElement.srcObject = screenStream;
        this.localStream = screenStream;
      }
      this.isVideoActive = true;
    } catch (error) {
      console.error('Error starting screen share:', error);
      ArtifactUtils.showErrorViaToast(
        this.toastr,
        'Error starting screen share. Please check your permissions.'
      );
    }
  }

  updateAppointmentStatusToCompleted(appointmentId: number): void {
    if (appointmentId !== undefined && appointmentId !== null) {
      // Call the backend API to update the status of the appointment to 'COMPLETED'
      this.appointmentService.updateAppointmentStatus(appointmentId, 'COMPLETED').subscribe({
        next: () => {
          // Update the status locally after a successful response from the backend
          const updatedAppointment = this.upcomingAppointments.find(appointment => appointment.appointmentId === appointmentId);
          if (updatedAppointment) {
            updatedAppointment.status = 'COMPLETED'; // Set status to COMPLETED
          }
  
          // Optionally, move it to the past appointments array
          this.pastAppointments.push(updatedAppointment!);
          this.upcomingAppointments = this.upcomingAppointments.filter(appointment => appointment.appointmentId !== appointmentId);
  
          // Notify user via toast
          ArtifactUtils.showSuccessViaToast(this.toastr, 'Appointment status updated to COMPLETED');
        },
        error: (error) => {
          console.error('Error updating appointment status:', error);
          ArtifactUtils.showErrorViaToast(this.toastr, 'Failed to update appointment status');
        }
      });
    } else {
      console.error('Invalid appointment ID');
      ArtifactUtils.showErrorViaToast(this.toastr, 'Invalid appointment ID');
    }
  }
  AddVisit() {
    this.router.navigate(['/doctor-main/doctor-visit-form'])
  }
}

