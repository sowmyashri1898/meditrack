import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterModule,
    SidebarModule,
    MenuModule,
    ButtonModule,
    ToolbarModule,
    CommonModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'], // Corrected property name
})
export class SidebarComponent implements OnInit {
  visible: boolean = false;

  items: MenuItem[] = [];

  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        items: [
          { label: 'Residents', icon: 'pi pi-users', routerLink: '/appointments' },
          { label: 'Patient Portal', icon: 'pi pi-user', routerLink: '/home' },
        ],
      },
      { label: 'Appointments', icon: 'pi pi-calendar', routerLink: '/appointments' },
      { label: 'Messages', icon: 'pi pi-envelope', routerLink: '/messages' },
      { label: 'Medical Records', icon: 'pi pi-file', routerLink: '/medRecord' },
      { label: 'Lab & Test Results', icon: 'pi pi-file-o', routerLink: '/labResults' },
      { label: 'Prescriptions & Medications', icon: 'pi pi-briefcase', routerLink: '/medication' },
      { label: 'Billing & Payments', icon: 'pi pi-credit-card', routerLink: '/billing' },
    ];
  }

  toggleSidebar() {
    this.visible = !this.visible;
  }
}
