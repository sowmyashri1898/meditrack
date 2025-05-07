import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-message',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule,FormsModule],
  templateUrl: './patient-message.component.html',
  styleUrl: './patient-message.component.scss'
})
export class PatientMessageComponent implements OnInit {
  
    messages: any[] = [];
    patientId!: number;
  
    constructor(private messageService: MessageService, private route: ActivatedRoute) { }
  
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.patientId = params['userId'];  // Assuming the route passes the patient ID
        this.loadPatientMessages();
      });
    }
  
    loadPatientMessages(): void {
      this.messageService.getMessagesByRole('receiver', this.patientId).subscribe(data => {
        this.messages = data;
      }, error => {
        console.error('Error loading patient messages', error);
      });
    }
  }
  

