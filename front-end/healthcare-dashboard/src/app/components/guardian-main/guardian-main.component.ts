import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GuardianSidebarComponent } from "../guardian-sidebar/guardian-sidebar.component";
import { GuardianNavbarComponent } from "../guardian-navbar/guardian-navbar.component";
import { RouterModule } from '@angular/router';
import { SignupService } from '../../services/signup.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guardian-main',
  standalone: true,
  imports: [GuardianSidebarComponent, GuardianNavbarComponent,RouterModule,CommonModule],
  templateUrl: './guardian-main.component.html',
  styleUrl: './guardian-main.component.scss'
})
export class GuardianMainComponent implements OnInit,AfterViewInit {
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
