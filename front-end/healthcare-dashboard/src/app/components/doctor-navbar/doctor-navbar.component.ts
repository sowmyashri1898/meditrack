import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { filter } from 'rxjs';
import { SignupService } from '../../services/signup.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-doctor-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, ToolbarModule, ButtonModule, BreadcrumbModule],
  templateUrl: './doctor-navbar.component.html',
  styleUrl: './doctor-navbar.component.scss'
})
export class DoctorNavbarComponent implements OnInit {
markAllAsRead() {
throw new Error('Method not implemented.');
}
  breadcrumbItems!: any[];


  @Output() sidebarToggle = new EventEmitter<void>();
  sidebarVisible: boolean = true; // Initial state of the sidebar visibility
  notificationsVisible: boolean = false;
  @Input() notifications: any[] = [];
  token: any;

  constructor(private router: Router,    private signupService: SignupService,private notificationService: NotificationService
  ) {}
  ngOnInit(): void {
    this.token = this.signupService.getAuthToken(); 
    this.notificationService.getSavedNotifications(this.token).subscribe((savedNotifications) => {
      this.notifications = savedNotifications;
    });
    this.setBreadcrumb();

    // Listen for router changes to update breadcrumb dynamically
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setBreadcrumb();
    });
  }
  setBreadcrumb() {
    const path = this.router.url.split('/').filter(segment => segment);

    this.breadcrumbItems = path.map((segment, index) => {
      return {
        label: segment.charAt(0).toUpperCase() + segment.slice(1), // Capitalize first letter
        url: '/' + path.slice(0, index + 1).join('/')
      };
    });

    // Optional: You can add custom labels for more complex paths
    if (this.router.url.includes('appointment')) {
      this.breadcrumbItems.push({ label: 'Appointments', routerLink: ['/doctor-appointment'] });
    }
    if (this.router.url.includes('visit')) {
      this.breadcrumbItems.push({ label: 'Add New Visit', routerLink: ['doctor-appointment/doctor-visit'] });
    }
  }
  toggleSidebar() {
    this.sidebarToggle.emit();  // Emit the event to toggle the sidebar in parent component
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/header/login']);  // Navigate to the login page
  }
  onProfile() {
    this.router.navigate(['/doctor-main/doctor-profile'])
  }
  onNotification() {
    // this.router.navigate(['/doctor-main/doctor-notification'])
    // this.router.navigate(['navbar/notification'])

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
}
