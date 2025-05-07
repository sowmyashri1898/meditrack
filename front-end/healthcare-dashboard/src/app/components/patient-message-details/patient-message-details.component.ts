import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-message-details',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './patient-message-details.component.html',
  styleUrl: './patient-message-details.component.scss'
})
export class PatientMessageDetailsComponent implements OnInit{
 
    message: any;
  
    constructor(private messageService: MessageService, private route: ActivatedRoute) { }
  
    ngOnInit(): void {
      const messageId = this.route.snapshot.paramMap.get('id');
      if (messageId) {
        this.loadMessageDetails(+messageId);
      }
    }
  
    loadMessageDetails(messageId: number): void {
      this.messageService.getMessageById(messageId).subscribe(data => {
        this.message = data;
      }, error => {
        console.error('Error loading message details', error);
      });
    }
  
    markAsRead(): void {
      if (this.message && this.message.status === 'UNREAD') {
        this.messageService.markAsRead(this.message.id).subscribe(data => {
          this.message.status = 'READ';
        }, error => {
          console.error('Error marking message as read', error);
        });
      }
    }
  
  
}
