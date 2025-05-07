import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-message-details',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './doctor-message-details.component.html',
  styleUrl: './doctor-message-details.component.scss'
})
export class DoctorMessageDetailsComponent implements OnInit{
 
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
  
    replyToMessage(): void {
      const replyMessage = {
        sender: this.message.receiver.username,
        receiver: this.message.sender.username,
        subject: `Re: ${this.message.subject}`,
        body: `Reply to message: ${this.message.body}`,
      };
      this.messageService.sendMessage(replyMessage).subscribe(data => {
        alert('Reply sent successfully!');
      }, error => {
        console.error('Error sending reply', error);
      });
    }
  }
  

