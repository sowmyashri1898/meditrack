import { CommonModule, DatePipe } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { Participant } from '../../classes/participants.model';
import { AppointmentDTO } from '../../classes/appointment.model';
import { AppointmentService } from '../../services/appointment.service';
import { SignupService } from '../../services/signup.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ArtifactUtils } from '../../util/util';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-appointments',
  standalone: true,
  providers: [MessageService,DatePipe],
  imports: [
    RouterModule,
    MenuModule,
    ButtonModule,
    ToolbarModule,
    CommonModule,
    CardModule,
    ReactiveFormsModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    TableModule,
    ToastModule
  ],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit, OnDestroy {

  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>;

  localStream!: MediaStream;
  participants: Participant[] = [];
  appointment: AppointmentDTO[] = [];
  upcomingAppointments: any[] = [];
  pastAppointments: any[] = [];
  displayDetailsDialog: boolean = false;
  selectedAppointment: any;
  displayJoinDialog: boolean = false;
  isMuted: boolean = false;
  isVideoActive: boolean = true;
  isChatVisible: boolean = false;
  isTranslatorActive: boolean = false;
  isEffectsActive: boolean = false;
  chatMessages: string[] = [];
  newMessage: string = '';
  token: string | null = null;
  availableEffects = [
    { name: 'Blur', thumbnail: 'assets/effects/blur.jpg' },
    { name: 'Grayscale', thumbnail: 'assets/effects/grayscale-thumbnail.png' },
    { name: 'Brightness', thumbnail: 'assets/effects/brightness-thumbnail.png' },
    { name: 'Sepia', thumbnail: 'assets/effects/sepia-thumbnail.png' },
  ];
  
  constructor(
    private appointmentService: AppointmentService,
    private signupService: SignupService,
    private toastr: MessageService,
    private datepipe:DatePipe,
  ) {}

  ngOnInit(): void {
    this.token = this.signupService.getAuthToken();
    console.log('Token:', this.token);
    if (this.token) {
      this.loadPatientAppointments();
    } else {
      console.log('No token found');
    }

    // this.pastAppointments = [
    //   { date: new Date('2024-10-01T09:00:00'), doctorName: 'Dr. Emily Brown', status: 'Completed', reason: 'Blood Test', notes: 'Normal results' },
    //   { date: new Date('2024-10-10T11:00:00'), doctorName: 'Dr. Michael White', status: 'Completed', reason: 'Eye Examination', notes: 'No issues found' }
    // ];
  }

  viewAppointmentDetails(appointment: any): void {
    this.selectedAppointment = appointment;
    this.displayDetailsDialog = true;
  }

  async clickOnJoin(appointment: AppointmentDTO): Promise<void> {
    this.displayJoinDialog = true;
    await this.setupLocalVideo();
    this.setupRoom(appointment);
  }

  hideVideoDialog(): void {
    this.displayJoinDialog = false;
    this.stopLocalVideo(); // Stop local video when leaving the room
  }

  toggleMute(): void {
    if (this.localStream) {
      const audioTrack = this.localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        this.isMuted = !audioTrack.enabled; // Update mute state
      }
    }
  }

  toggleVideo(): void {
    if (this.localStream) {
      const videoTrack = this.localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        this.isVideoActive = !videoTrack.enabled; // Update video state
      }
    }
  }

  toggleChat(): void {
    this.isChatVisible = !this.isChatVisible;
  }

  toggleTranslator(): void {
    this.isTranslatorActive = !this.isTranslatorActive;
  }

  toggleEffects(): void {
    this.isEffectsActive = !this.isEffectsActive;
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.chatMessages.push(this.newMessage); // Simulate sending a message
      this.newMessage = ''; // Clear input after sending
    }
  }

  async setupLocalVideo(): Promise<void> {
    try {
      // Get local media stream (video + audio)
      this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (this.localVideo) {
        this.localVideo.nativeElement.srcObject = this.localStream; // Attach the local stream to video element
      }
      this.isVideoActive = true; // Mark video as active
    } catch (err) {
      console.error('Error accessing local media: ', err);
      ArtifactUtils.showErrorViaToast(this.toastr, 'Error accessing your camera or microphone. Please check your device permissions.');
    }
  }

  stopLocalVideo(): void {
    if (this.localStream) {
      const tracks = this.localStream.getTracks();
      tracks.forEach(track => track.stop()); // Stop all tracks (video/audio)
      console.log('Local video stopped');
    }
  }

  leaveCall(): void {
    this.displayJoinDialog = false;
    this.stopLocalVideo();
    this.leaveRoom();
    this.participants = [];
  }

  leaveRoom(): void {
    // Implement the logic for leaving the room if necessary
    console.log('Room left');
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      this.stopLocalVideo();
      this.leaveRoom();
      // this.participants.forEach(participant => {
      //   participant.videoStream.getTracks().forEach((track: { stop: () => void; }) => track.stop());
      // });
    }
  }

  setupRoom(appointment: AppointmentDTO): void {
    this.participants = [{ name: 'You', videoStream: this.localStream }];
    if (appointment && appointment.doctorName) {
      const remoteStream = new MediaStream();
      this.participants.push({ name: appointment.doctorName, videoStream: remoteStream });
      console.log('Remote participant added:', appointment.doctorName);
    }
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
          this.pastAppointments = transformAppointments(appointments, (date) => date < currentDate);

          console.log('Upcoming Appointments:', this.upcomingAppointments);
          console.log('Past Appointments:', this.pastAppointments);

          if (appointments.length > 0) {
            this.setupRoom(appointments[0]);
          }
        },
        (error) => {
          console.error('Error fetching patient appointments:', error);
          ArtifactUtils.showErrorViaToast(this.toastr, 'Failed to load your appointments. Please try again.');
        }
      );
    }
  }
  
  
  

  cancelAppointment(appointmentId: number): void {
    if (appointmentId !== undefined && appointmentId !== null) {
      this.appointmentService.deleteAppointment(appointmentId).subscribe({
        next: () => {
          console.log(`Appointment with ID ${appointmentId} deleted successfully.`);
          this.upcomingAppointments = this.upcomingAppointments.filter(appointment => appointment.appointmentId !== appointmentId);
          ArtifactUtils.showSuccessViaToast(this.toastr, 'Appointment deleted successfully!');
        },
        error: (error) => {
          console.error(`Error deleting appointment with ID ${appointmentId}:`, error);
          ArtifactUtils.showErrorViaToast(this.toastr, 'Failed to delete appointment. Please try again.');
        }
      });
    } else {
      console.error('Invalid appointment ID');
      ArtifactUtils.showErrorViaToast(this.toastr, 'Invalid appointment ID');
    }
  }
  async startScreenShare(): Promise<void> {
    try {
      // Request display media for screen sharing
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      // Replace local video stream with screen stream
      if (this.localVideo) {
        this.localVideo.nativeElement.srcObject = screenStream;
        this.localStream = screenStream; // Update the local stream with the screen share
      }
      this.isVideoActive = true; // Set video as active
    } catch (error) {
      console.error('Error starting screen share:', error);
      ArtifactUtils.showErrorViaToast(this.toastr, 'Error starting screen share. Please check your permissions.');
    }
  }
  
  applyEffect(effect: any): void {
    if (this.localVideo) {
      // Check the effect type and apply the corresponding CSS filter to the video
      switch (effect.name) {
        case 'Blur':
          this.localVideo.nativeElement.style.filter = 'blur(5px)';
          break;
        case 'Grayscale':
          this.localVideo.nativeElement.style.filter = 'grayscale(100%)';
          break;
        case 'Brightness':
          this.localVideo.nativeElement.style.filter = 'brightness(150%)';
          break;
        case 'Sepia':
          this.localVideo.nativeElement.style.filter = 'sepia(100%)';
          break;
        default:
          this.localVideo.nativeElement.style.filter = 'none';
          break;
      }
      console.log(`Applied effect: ${effect.name}`);
    }
  }
  
}
