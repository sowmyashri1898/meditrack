import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chatService';  // Correct path to the service
import { HealthcareServiceService } from '../../services/healthcare-service.service';  // Path to your healthcare service
import { Observable, forkJoin } from 'rxjs';  // For making multiple API calls

interface Message {
  sender: string;
  text: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  chatVisible = false;  // Controls whether the chat is visible
  userMessage = '';     // Stores the user's message
  messages: Message[] = [];  // Initialize messages array with type 'Message[]'
  isBotTyping = false;  // Flag to show bot typing indicator

  constructor(
    private chatbotService: ChatService,
    private healthcareService: HealthcareServiceService,
    private cdRef: ChangeDetectorRef
  ) {}

  // Function to toggle the chat window visibility
  toggleChat() {
    this.chatVisible = !this.chatVisible;
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      console.log("Sending message:", this.userMessage);
      this.messages.push({ sender: 'User', text: this.userMessage });
      const userMessage = this.userMessage;
      this.userMessage = '';
      this.isBotTyping = true;

      this.getHealthcareData().subscribe({
        next: (data) => {
          console.log('Healthcare data received:', data);

          // Combine user message and healthcare data to send to Rasa
          const payload = {
            user_message: userMessage,
            healthcare_info: data
          };

          this.sendToRasa(payload);
        },
        error: (err) => {
          console.error('Error fetching healthcare data:', err);
          this.isBotTyping = false;
          this.messages.push({
            sender: 'Bot',
            text: 'Sorry, there was an issue fetching healthcare data. Please try again later.'
          });
        }
      });
    }
  }

  getHealthcareData(): Observable<any> {
    return forkJoin({
      symptoms: this.healthcareService.getSymptoms(),
      // doctors: this.healthcareService.getDoctorsBySymptom('headache'), // Replace 'headache' with a dynamic value if needed
      // locations: this.healthcareService.getLocations(),
      // hospitals: this.healthcareService.getHospitals()
    });
  }

  sendToRasa(payload: any) {
    this.chatbotService.sendSymptom(payload.user_message).subscribe({
      next: (response) => {
        console.log("Raw Bot response:", response);
        if (response && response.text) {
          this.messages.push({ sender: 'Bot', text: response.text });
        } else {
          this.messages.push({
            sender: 'Bot',
            text: 'Sorry, I could not understand the response.'
          });
        }
        this.isBotTyping = false;
        this.cdRef.detectChanges();
      },
      error: (error) => {
        console.error('Error:', error);
        this.messages.push({
          sender: 'Bot',
          text: 'Sorry, something went wrong. Please try again later.'
        });
        this.isBotTyping = false;
      }
    });
  }
}
