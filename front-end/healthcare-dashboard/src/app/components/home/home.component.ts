import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast'; // Import the ToastModule
import { MultiSelectModule } from 'primeng/multiselect';
import { Symptom } from '../../classes/symptoms.model';
import { Provider } from '../../classes/providers.model';
import { ChatService } from '../../services/chatService';
import { CalendarModule } from 'primeng/calendar';
import { ChatComponent } from "../chat/chat.component";
import { AppointmentDTO } from '../../classes/appointment.model';
import { AppointmentService } from '../../services/appointment.service';
import { Router, RouterModule } from '@angular/router';
import { PrescriptionService } from '../../services/prescription.service';
import { ArtifactUtils } from '../../util/util';
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [MessageService, DatePipe],
  imports: [
    DialogModule,
    ButtonModule,
    MenuModule,
    SidebarModule,
    ToolbarModule,
    CardModule,
    PanelModule,
    DropdownModule,
    CommonModule,
    ToastModule,
    ReactiveFormsModule,
    MultiSelectModule, CalendarModule,
    ChatComponent,
    RouterModule
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  refillForm!: FormGroup;
  medications: any[] = [];
  healthInsights: any;
  displayRequestRefillDialog: boolean = false;
  appointment: any;
  minDate: Date = new Date();
  locations: string[] = [];
  hospitals: string[] = [];
  appointmentForm!: FormGroup;
  providers: Provider[] = [];
  filteredProviders: any[] = [];
  symptomOptions: Symptom[] = [];
  displayScheduleDialog:boolean = false;
  selectedSymptoms: any[] = [];
dosages: any[]=[];
token: string | null = null;
upcomingAppointments: any[]=[];

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    private prescriptionService:PrescriptionService,
    private messageService: MessageService,
    public datePipe: DatePipe,
    private signupService:SignupService,
    public chatService: ChatService,
    public appointmentService:AppointmentService
  ) {
    this.providers = [
      new Provider(1, 'Dr. John Doe', ['General Medicine'], 'New York', 'City Hospital', ['001', '002']),
      new Provider(2, 'Dr. Jane Smith', ['Pediatrics'], 'Los Angeles', 'General Hospital', ['003']),
      new Provider(3, 'Dr. Emily Clark', ['Cardiology'], 'Chicago', 'Downtown Clinic', ['001']),
    ];

    this.locations = Array.from(new Set(this.providers.map(provider => provider.location)));
    this.hospitals = Array.from(new Set(this.providers.map(provider => provider.hospital)));
  }

  ngOnInit() {
    this.filteredProviders = [...this.providers];
    this.token = this.signupService.getAuthToken();

    this.appointmentForm = this.formBuilder.group({
      date: [null, Validators.required],
      time: ['', Validators.required],
      provider: [null, Validators.required],
      symptoms: [null],
      location: [null],
      hospital: [null]
    });

    this.refillForm = this.formBuilder.group({
      medication: [null, Validators.required],
      dosage: [null, Validators.required],
      quantity: ['', Validators.required],
      refillNotes: ['', Validators.required]
    });
    this.loadMedications();
    this.loadDosages();
this.loadPatientAppointments();
  }
  loadMedications():void {
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
                      formattedDate: this.datePipe.transform(appointmentDate, 'MMM d, y, h:mm a'), // Format: Jan 22, 2025, 4:30 PM
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
  scheduleAppointment() {
    this.router.navigate(['navbar/schedule-appointment'])
    // this.displayScheduleDialog = true;
  }

  filterDoctorsBySymptoms() {
    // Get selected symptoms and map them to an array of symptom codes
    const selectedSymptoms: string[] = this.appointmentForm.get('symptoms')?.value?.map((symptom: any) => symptom.code) || [];
    const location = this.appointmentForm.get('location')?.value;
    const hospital = this.appointmentForm.get('hospital')?.value;

    console.log('Selected Symptoms:', selectedSymptoms);
    console.log('Location:', location);
    console.log('Hospital:', hospital);

    // If no symptoms are selected, show all providers
    if (!selectedSymptoms || selectedSymptoms.length === 0) {
      this.filteredProviders = this.providers;
      console.log('No symptoms selected, showing all providers');
      return;
    }

    this.filteredProviders = this.providers.filter(provider => {
      // Check if any of the selected symptoms match the provider's symptoms
      const matchesSymptoms = selectedSymptoms.some((symptomCode: string) => {
        const match = provider.symptoms.includes(symptomCode);
        console.log(`Provider ${provider.name} matches symptom ${symptomCode}: ${match}`);
        return match;
      });

      // Check if location and hospital match
      const matchesLocation = location ? provider.location === location : true;
      const matchesHospital = hospital ? provider.hospital === hospital : true;

      console.log(`Matching Location: ${matchesLocation}`);
      console.log(`Matching Hospital: ${matchesHospital}`);

      return matchesSymptoms && matchesLocation && matchesHospital;
    });

    console.log('Filtered Providers:', this.filteredProviders);  // Check filtered providers
  }

  submitAppointment(): void {
    this.appointmentService.createAppointment(this.appointment).subscribe(
      (data: AppointmentDTO) => {
        console.log('Appointment created successfully', data);
      },
      (      error: any) => {
        console.error('Error creating appointment', error);
      }
    );
  }

  register() {
    this.router.navigate(['navbar/register']);
  }

  clear() {
    this.appointmentForm.reset();
  }

  onHideAppointment() {
    this.clear();
  }

  closeScheduleDialog() {
    this.displayScheduleDialog = false;
  }

  requestRefill() {
    this.displayRequestRefillDialog = true;
  }

  labResult() {
    this.router.navigate(['navbar/lab-result']);
  }

  clearForm() {
    this.refillForm.reset();
  }

  submitRefillRequest() {
    if (this.refillForm.valid) {
      console.log('Appointment Submitted:', this.refillForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  onHideRequestRefill() {
    this.displayRequestRefillDialog = false;
  }
}
