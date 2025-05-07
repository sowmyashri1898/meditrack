import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-communication-management',
  standalone: true,
  providers:[DatePipe],
  imports: [CommonModule,
    FormsModule,
    HttpClientModule,
    TabViewModule, DropdownModule, ButtonModule, InputTextModule, TableModule,
  CheckboxModule,DialogModule,FormsModule,ReactiveFormsModule],
  templateUrl: './communication-management.component.html',
  styleUrls: ['./communication-management.component.scss']
})
export class CommunicationManagementComponent implements OnInit {
  inboxMessages: any[] = [];
  filteredInboxMessages: any[] = []; 
  outboxMessages: any[] = [];
  content: string = '';
  priority: string = 'MEDIUM';
  receiverIdentifier: string = '';
  senderIdentifier: string = '';
  loggedInUserEmail: string = ''; 
  selectAll: boolean = false; 

  priorityOptions = [
    { label: 'High', value: 'HIGH' },
    { label: 'Medium', value: 'MEDIUM' },
    { label: 'Low', value: 'LOW' }
  ];
  selectedMessage: any;
  displayMessageDialog: boolean = false;
  activeTabIndex: number = 0; // To switch between tabs
  filterOptions: any[] = [
    { label: 'All', value: 'all' },
    { label: 'Unread', value: 'unread' },
    { label: 'Read', value: 'read' }
  ];
  searchFilterForm!:FormGroup;
  constructor(private messageService: MessageService,public formBuilder: FormBuilder ) {}

  ngOnInit(): void {
    this.loggedInUserEmail = localStorage.getItem('userEmail') || '';
    this.senderIdentifier = this.loggedInUserEmail;
 this.searchFilterForm = this.formBuilder.group({
          searchKeyword: ['',],
          selectedFilter:['',Validators.required]
        })
    this.getInboxMessages();  
    this.getOutboxMessages(); 
  }

  getInboxMessages(): void {
    this.messageService.getInboxMessages(this.loggedInUserEmail).subscribe(
      (data) => {
        this.inboxMessages = data.map((message) => {
          if (Array.isArray(message.sentAt)) {
            message.sentAt = this.convertToDate(message.sentAt); // Convert date array to Date object
          }
          return message;
        });
        this.filteredInboxMessages = this.inboxMessages; 
      },
      (error) => {
        console.error('Error fetching inbox messages', error);
      }
    );
  }

  getOutboxMessages(): void {
    this.messageService.getOutboxMessages(this.loggedInUserEmail).subscribe(
      (data) => {
        this.outboxMessages = data;
      },
      (error) => {
        console.error('Error fetching outbox messages', error);
      }
    );
  }

  sendMessage(): void {
    const messageRequest = {
      senderIdentifier: this.loggedInUserEmail,
      receiverIdentifier: this.receiverIdentifier,
      content: this.content,
      priority: this.priority
    };

    this.messageService.sendMessage(messageRequest).subscribe(
      () => {
        alert('Message sent successfully!');
        this.content = '';
        this.receiverIdentifier = '';
        this.priority = 'MEDIUM';
        this.getOutboxMessages();
      },
      (error) => {
        console.error('Error sending message', error);
      }
    );
  }

  filterInboxMessages(event: any): void {
    const query = event.target.value.toLowerCase(); 
    this.filteredInboxMessages = this.inboxMessages.filter((message) => {
      const senderEmail = message.sender.email ? message.sender.email.toLowerCase() : '';
      const messageContent = message.content ? message.content.toLowerCase() : '';
      return senderEmail.includes(query) || messageContent.includes(query); 
    });
    this.selectAll = false; 
  }

  archiveMessage(messageId: number): void {
    this.messageService.archiveMessage(messageId).subscribe(() => {
      this.inboxMessages = this.inboxMessages.filter((msg) => msg.id !== messageId);
      this.filteredInboxMessages = this.filteredInboxMessages.filter((msg) => msg.id !== messageId);
    });
  }

  toggleAllSelection(): void {
    this.filteredInboxMessages.forEach((message) => {
      message.selected = this.selectAll;
    });
  }

  convertToDate(dateArray: number[]): Date {
    return new Date(Date.UTC(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4], dateArray[5], dateArray[6] / 1000000));
  }
  viewMessageDetails(message: any): void {
    this.selectedMessage = message; 
    this.displayMessageDialog = true; 
  }
  replyToMessage(message: any): void {
    // Pre-fill the "Send Message" form with the original message details
    this.receiverIdentifier = message.sender.email;
    this.content = `Re: ${message.content}`; // Optional: Include the original message content
    this.priority = 'MEDIUM'; // Default priority
  
    // Optionally navigate to the "Send Message" tab
    this.activeTabIndex = 2; // Assuming "Send Message" is the third tab
  }
  markAsRead(message: any): void {
    this.messageService.markAsRead(message.id).subscribe(
      () => {
        message.isRead = true; // Update the local state
        alert('Message marked as read.');
      },
      (error) => {
        console.error('Error marking message as read', error);
      }
    );
  }
  markAsUnread(message: any): void {
    this.messageService.markAsUnread(message.id).subscribe(
      () => {
        message.isRead = false; // Update the local state
        alert('Message marked as unread.');
      },
      (error) => {
        console.error('Error marking message as unread', error);
      }
    );
  }
      
}
