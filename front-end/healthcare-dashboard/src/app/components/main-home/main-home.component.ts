import { Component, OnInit } from '@angular/core';
import { ContactComponent } from "../contact/contact.component";
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SignupService } from '../../services/signup.service';
import { ButtonModule } from 'primeng/button';
import { ArtifactUtils } from '../../util/util';
import { ChatComponent } from "../chat/chat.component";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-home',
  standalone: true,
  imports: [ContactComponent, ToastModule, FooterComponent, HeaderComponent, RouterModule, CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, ToastModule, ChatComponent],
  providers:[MessageService,],

  templateUrl: './main-home.component.html',
  styleUrl: './main-home.component.scss'
})
export class MainHomeComponent implements OnInit{

  constructor(private messageService:MessageService,private router: Router,
    
  private signupService:SignupService){}
 
  services = [
    { id: 1, name: 'Primary Care', description: 'Comprehensive care for all your health needs.' },
    { id: 2, name: 'Pediatrics', description: 'Specialized care for children of all ages.' },
    { id: 3, name: 'Mental Health', description: 'Therapy and counseling to support mental wellness.' }
  ];
  testimonials = [
    { patient_name: 'Sarah L.', feedback: 'Amazing care, the staff is friendly and the doctors are so knowledgeable.' },
    { patient_name: 'John D.', feedback: 'I felt heard and cared for. Highly recommend!' },
    { patient_name: 'Maria W.', feedback: 'Best healthcare experience with great telehealth services.' }
  ];
  owlOptions = {
    items: 1,
    dots: true,
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 5000
  };
  ngOnInit(): void {
  }
  navigateToAppointment() {
    if(this.signupService.isLoggedIn()){
      
      this.router.navigate(['/navbar/home'])  }

    else{
      ArtifactUtils.showWarnViaToast(
        this.messageService,
        'Please login to book an appointment'
      );

      // this.messageService.add({ severity: 'warn', summary: 'warn', detail: 'Please Login' });

    }
  // constructor(private router: Router) {
  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationEnd) {
  //       console.log('Navigated to:', event.url);
  //     }
  //   });
  }
  
}
