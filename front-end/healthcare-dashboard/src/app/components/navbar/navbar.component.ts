import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../classes/patients.model';
import { SignupService } from '../../services/signup.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { SidebarModule } from 'primeng/sidebar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { filter } from 'rxjs';
import { BreadcrumbModule } from 'primeng/breadcrumb';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports:[RouterModule,CommonModule,ButtonModule,
    MenuModule, MatSidenavModule,
    MatButtonModule,ReactiveFormsModule,FormsModule,SidebarModule,BreadcrumbModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,AfterViewInit {
  isLoggedIn: boolean = false;
  visible: boolean = false;
  notificationsVisible: boolean = false;
  unreadNotifications: number = 5;
  latestPatient: any;
  historicalPatients: any[] = [];
  patient: Patient = { 
    firstName: '', 
    lastName: '', 
    patientImage: '', 
    dob: '', 
    address: '', 
    allergies: '',
    bloodPressure: '', 
    contactNumber: null, 
    currentMedications: '', 
    gender: '', 
    heartRate: null, 
    height: null, 
    temperature: null, 
    weight: null, 
    email: '', 
    previousDiseases: '',
    isResident: false, // True for residents, false for regular patients
    roomNumber: '',
    dietaryPreferences: '',
    guardian: { id: 1, firstName: '', lastName: '', contactNumber: '', email: '', relationship: '' }, // Removed residents
    preferredEvents: []
  };
  imageUrl: string | null = null;
  items: MenuItem[] = [
    { label: 'Home', icon: 'pi pi-home',  
      items: [
      { label: 'Dashboard', icon: 'pi pi-users', routerLink: '/navbar/resident-dashboard' },
      { label: 'Patient Portal', icon: 'pi pi-user', routerLink: '/navbar/home' },

    ]},
    { label: 'Appointments', icon: 'pi pi-calendar', 
      items: [
        { label: 'Appointments', icon: 'pi pi-calendar', routerLink: '/navbar/appointments' },
  
      ]},
    { label: 'Messages', icon: 'pi pi-envelope', 
      items: [
        { label: 'Messages', icon: 'pi pi-envelope', routerLink: '/navbar/communication-management' },

        // { label: 'Messages', icon: 'pi pi-envelope', routerLink: '/navbar/messages' },
  
      ]},
    { label: 'Medical Records', icon: 'pi pi-file', 
      items: [
        { label: 'Medical Records', icon: 'pi pi-file', routerLink: '/navbar/medRecord' },
  
      ]},
     
    { label: 'Lab & Test Results', icon: 'pi pi-file-o', 
      items: [
        { label: 'Lab & Test Results', icon: 'pi pi-file-o', routerLink: '/navbar/labResults' },
  
      ]},
    { label: 'Prescriptions & Medications', icon: 'pi pi-briefcase',
      items: [
        { label: 'Prescriptions & Medications', icon: 'pi pi-briefcase', routerLink: '/navbar/medication' },
  
      ]},
    { label: 'Billing & Payments', icon: 'pi pi-credit-card',
      items: [
        { label: 'Billing & Payments', icon: 'pi pi-credit-card', routerLink: '/navbar/billing' },
  
      ]},
    { label: 'Logout', icon: 'pi pi-sign-out',
      items:[{label:'Logout',icon:'pi pi-signout', command: () => this.logout() }]}
      
  ];
  
  @Input() notifications: any[] = [];

  // notifications: string[] = [
  //   'Your appointment is confirmed for tomorrow.',
  //   'New test results are available.',
  //   'Prescription refill reminder.',
  //   'Billing statement available.',
  //   'System maintenance planned for 3 PM.',
  // ];
  errorMessage!: string;
  token: string | null = null;
isSidebarVisible:boolean = false;
selectedImageUrl: string | ArrayBuffer | null = null; 
breadcrumbItems!: any[];


  constructor(
    private router: Router, 
    private patientService: PatientService,
    private signupService: SignupService,private notificationService: NotificationService
  ) {}
  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      const authToken = localStorage.getItem('authToken');
    }
  }
  ngOnInit(): void {
    this.token = this.signupService.getAuthToken(); 
    console.log('Token:', this.token);  
    if (this.token) {
      this.loadPatientData();  
    } else {
      console.log('No token found');  
    }   
    if (this.token) {

    this.notificationService.getSavedNotifications(this.token).subscribe((savedNotifications) => {
      this.notifications = savedNotifications;
    });
  }
    this.setBreadcrumb();
    
        // Listen for router changes to update breadcrumb dynamically
        this.router.events.pipe(
          filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
          this.setBreadcrumb();
        });
     this.router.navigate(['navbar/resident-dashboard']);
  }
  setBreadcrumb() {
    const path = this.router.url.split('/').filter(segment => segment);

    this.breadcrumbItems = path.map((segment, index) => {
      return {
        label: segment.charAt(0).toUpperCase() + segment.slice(1), // Capitalize first letter
        url: '/' + path.slice(0, index + 1).join('/')
      };
    });
  }
  onMenuItemClick(event: any) {
    this.router.navigate([event.item.routerLink]); // Navigate based on the selected menu item
    this.isSidebarVisible = false; // Close the sidebar after navigation
  }
  
  loadPatientData(): void {
    if (this.token) {
      this.patientService.getPatientDetails(this.token).subscribe(
        (data) => {
          this.latestPatient = data.latestPatient;
          this.historicalPatients = data.historicalPatients; 
            if (data?.profilePicture) {
            this.selectedImageUrl = 'data:image/jpeg;base64,' + data.profilePicture;
          } else {
            this.selectedImageUrl = null;           }
          
             },
        (error) => {
          this.errorMessage = 'Failed to fetch patient details. Please try again later.';
          console.error('Error fetching patient data:', error);
        }
      );
    }
  }
  onProfile(){
    this.router.navigate(['/navbar/register']);
  }
  logout(): void {
    // window.location.href = '/login'; 
    localStorage.clear();
    this.router.navigate(['/main-home'])

  }

  toggleNotifications() {
    this.notificationsVisible = !this.notificationsVisible;
  
    if (this.notificationsVisible) {
      if (this.token) {
        if (this.notifications.length === 0) {
        this.notificationService.getSavedNotifications(this.token).subscribe((savedNotifications) => {
          this.notifications = savedNotifications; // Replace the existing list instead of appending
        });
      }
      
    }
  }
}
  

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  openSettings() {
    this.router.navigate(['navbar/settings']);
  }

  markAllAsRead() {
    this.unreadNotifications = 0;
    this.notificationsVisible = false;
  }
  // markAllAsRead() {
  //   this.notificationService.markAllAsRead(this.loggedInUserId).subscribe(
  //     () => {
  //       this.unreadNotifications = 0;
  //       this.notifications.forEach(notification => notification.isRead = true);
  //       this.notificationsVisible = false;
  //     },
  //     (error) => {
  //       console.error('Error marking notifications as read:', error);
  //     }
  //   );
  // }
  
}
