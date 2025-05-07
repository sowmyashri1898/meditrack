import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SignupService } from '../../services/signup.service';
import { AuthService } from '../../services/auth.service';
import { MessageService,  } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ArtifactUtils } from '../../util/util';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  providers:[MessageService],
  imports: [ButtonModule,CommonModule,RouterModule,ToastModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

constructor(private authService:SignupService,private messageService:MessageService,private router: Router,
){}
  ngOnInit(): void {
}

logout() {
   this.authService.logout();  
    this.isLoggedIn = false; 
  }
  onBookAppointment() {
    console.log('Is logged in:', this.authService.isLoggedIn()); // Check if it's returning the correct value
  
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/navbar/appointments']);
    } else {
      ArtifactUtils.showWarnViaToast(
        this.messageService,
        'Please login to book an appointment'
      );
     
    }
  }
  
}
