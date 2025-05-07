import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-guardian-sidebar',
  standalone: true,
  imports: [RouterModule,CommonModule,SidebarModule,MenuModule],
  templateUrl: './guardian-sidebar.component.html',
  styleUrl: './guardian-sidebar.component.scss'
})
export class GuardianSidebarComponent implements OnInit{
  @Input() sidebarVisible: boolean = true;
  menuItems!: any[];

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: '/guardian-main/guardian-dashboard',
      },
      // {
      //   label: 'Appointments',
      //   icon: 'pi pi-calendar',
      //   routerLink: '/doctor-main/doctor-appointment',
      // },
      // {
      //   label: 'Messages',
      //   icon: 'pi pi-comment',
      //   routerLink: '/doctor-main/doctor-message',
      // },
      // {
      //   label: 'Profile',
      //   icon: 'pi pi-user',
      //   routerLink: '/doctor-main/doctor-profile',
      // },
      // {
      //   label: 'Prescriptions & Medications',
      //   icon: 'pi pi-briefcase',
      //   routerLink: '/doctor-main/doctor-priscription',
      // },
      // { label: 'Billing & Payments', icon: 'pi pi-credit-card', routerLink: '/doctor-main/doctor-billing' },
      { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() },
    ];
  }
  logout() {
    localStorage.clear();
    window.location.href = '/header/login'; // Redirect to login page
  }
}
