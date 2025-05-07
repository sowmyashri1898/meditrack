import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Message } from '../../classes/message.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    RouterModule, ButtonModule, DialogModule, CommonModule, 
    InputTextModule, DropdownModule, TableModule, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  selectedMessages: Message[] = [];
  selectedMessage: Message | null = null;
  displayMessageDialog: boolean = false;

  replyForm!: FormGroup;
  searchFilterForm!: FormGroup;
  filterOptions: any[] = [
    { label: 'All', value: 'all' },
    { label: 'Unread', value: 'unread' },
    { label: 'Read', value: 'read' }
  ];

  constructor(public formBuilder: FormBuilder) {
    // Initialize reply form
   

    // Combined search and filter form
    // this.searchFilterForm = new FormGroup({
    //   searchKeyword: new FormControl('all'),
    //   selectedFilter: new FormControl('all')
    // });
  }

  ngOnInit(): void {
    // Sample messages
        this.searchFilterForm = this.formBuilder.group({
          searchKeyword: ['',],
          selectedFilter:['',Validators.required]
        })
        this.replyForm = this.formBuilder.group({
          replyMessage: ['']
        });
    this.messages = [
      {
        sender: 'Dr. John Doe',
        subject: 'Test Results Received',
        date: new Date(),
        body: 'Your test results are ready...',
        isRead: false,
        attachments: [{ name: 'Results.pdf', url: '/assets/results.pdf' }]
      },
      {
        sender: 'Dr. Jane Smith',
        subject: 'Follow-up Appointment',
        date: new Date(),
        body: 'Please schedule your follow-up appointment...',
        isRead: true,
        attachments: []
      }
    ];
  }

  // View details of a message
  viewMessageDetails(message: Message) {
    this.selectedMessage = message;
    this.displayMessageDialog = true;
  }

  // Prepare reply to a message
  replyToMessage(message: Message) {
    this.selectedMessage = message;
    this.replyForm.reset();
    this.displayMessageDialog = true;
  }

  // Send the reply
  sendReply() {
    const reply = this.replyForm.get('replyMessage')?.value.trim();
    if (reply !== '') {
      console.log('Replying to:', this.selectedMessage?.subject);
      console.log('Reply Message:', reply);
      this.replyForm.reset();
      this.displayMessageDialog = false;
    }
  }

  markAsRead(message: Message) {
    message.isRead = true;
  }

  markAsUnread(message: Message) {
    message.isRead = false;
  }
}
