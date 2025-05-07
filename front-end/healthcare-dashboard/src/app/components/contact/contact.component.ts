import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Contact } from '../../classes/contact.model';
import { ContactService } from '../../services/contact.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,
    InputTextModule,
    InputTextModule,
    ButtonModule,],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {


  contact: Contact = new Contact();
  loading = false;

  constructor(private contactService: ContactService,
     private messageService: MessageService,
    private router:Router) {}
   ngOnInit(): void {
   }

   onSubmit() {
    this.loading = true;
    this.contactService.sendContactMessage(this.contact).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message sent successfully!' });
        this.contact = new Contact();
        this.loading = false;
        this.router.navigate(['/main-home'])

      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error sending message.' });
        this.loading = false;
      }
    );
  }

}
