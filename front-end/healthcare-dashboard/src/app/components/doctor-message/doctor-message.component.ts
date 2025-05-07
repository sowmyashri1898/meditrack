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
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-doctor-message',
  standalone: true,
  imports: [RouterModule, CommonModule,MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatDividerModule, 
    MatListModule, MatFormFieldModule, 
    MatInputModule,MatSelectModule,FormsModule,ReactiveFormsModule],
  templateUrl: './doctor-message.component.html',
  styleUrl: './doctor-message.component.scss'
})
export class DoctorMessageComponent implements OnInit {

    messages: any[] = [];
    doctorId!: number;
  
    constructor(private messageService: MessageService, private route: ActivatedRoute) { }
  
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.doctorId = params['userId'];  // Assuming the route passes the doctor ID
        this.loadDoctorMessages();
      });
    }
  
    loadDoctorMessages(): void {
      this.messageService.getMessagesByRole('sender', this.doctorId).subscribe(data => {
        this.messages = data;
      }, error => {
        console.error('Error loading doctor messages', error);
      });
    }
  }
  


