import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarModule,MenuModule,RouterModule,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
 
  @Input() sidebarVisible: boolean = true;
  menuItems!: any[];
  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: '/admin-main/admin-dashboard',
      },
      { label: 'Communication Management', icon: 'pi pi-envelope',routerLink: '/admin-main/communication-management' },
      { label: 'Entertainment Events', icon: 'pi pi-ticket',routerLink: '/admin-main/admin-entertainment' },
      { label: 'Housekeeping Events', icon: 'pi pi-refresh',routerLink: '/admin-main/admin-housekeeping-repair' },
      { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() },
    ];
  }
  logout() {
    localStorage.clear();
    window.location.href = '/header/login'; // Redirect to login page
  }
}


