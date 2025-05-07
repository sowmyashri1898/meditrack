import { Component } from '@angular/core';
import { SignupService } from '../../../services/signup.service';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent,RouterModule,RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
token: any;
  sidebarVisible: boolean = false;  

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
  constructor(private signupService:SignupService){}
  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      const authToken = localStorage.getItem('authToken');
    }
  }

  ngOnInit(): void {
    this.token = this.signupService.getAuthToken(); 
  }


}
