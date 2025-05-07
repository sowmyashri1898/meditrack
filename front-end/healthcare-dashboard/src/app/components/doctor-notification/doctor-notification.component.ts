import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'app-doctor-notification',
  standalone: true,
  imports: [RouterModule, CommonModule,MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatDividerModule, 
    MatListModule, MatFormFieldModule, 
    MatInputModule,MatSelectModule,FormsModule,ReactiveFormsModule],
  templateUrl: './doctor-notification.component.html',
  styleUrl: './doctor-notification.component.scss'
})
export class DoctorNotificationComponent implements OnInit{
  notifications: any[] = [];
  token: string | null = null;

  constructor(private notificationService:NotificationService,private signupService:SignupService){}
ngOnInit(): void {
  this.token = this.signupService.getAuthToken(); 

  this.notificationService.getSavedNotifications(this.token).subscribe((savedNotifications) => {
    this.notifications = savedNotifications;
  });
}
}
