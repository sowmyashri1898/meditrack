import { AfterViewInit, Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SignupService } from '../../services/signup.service';
import { DoctorSidebarComponent } from "../doctor-sidebar/doctor-sidebar.component";
import { DoctorNavbarComponent } from "../doctor-navbar/doctor-navbar.component";
import { SidebarModule } from 'primeng/sidebar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor-main',
  standalone: true,
  imports: [ RouterModule, CommonModule, DoctorSidebarComponent, DoctorNavbarComponent,SidebarModule],
  templateUrl: './doctor-main.component.html',
  styleUrl: './doctor-main.component.scss'
})
export class DoctorMainComponent implements OnInit, AfterViewInit {
  token: any;
  sidebarVisible: boolean = false;  // Manage sidebar visibility

  // Method to toggle sidebar visibility
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
  constructor(private signupService:SignupService){}
  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      const authToken = localStorage.getItem('authToken');
      // Proceed with the logic using authToken
    }
  }

  ngOnInit(): void {
    this.token = this.signupService.getAuthToken(); 
  }
}
