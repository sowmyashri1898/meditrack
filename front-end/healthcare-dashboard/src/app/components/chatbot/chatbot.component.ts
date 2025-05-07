import { Component } from '@angular/core';
import { ChatbotService } from '../../services/chatbot.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-chatbot',
  standalone:true,
  imports:[CommonModule,FormsModule,RouterModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {

  userMessage: string = '';
  botMessage: string[] = [];
  loading: boolean = false;

  constructor(private chatbotService: ChatbotService) {}

  sendMessage() {
    if (!this.userMessage.trim()) return;

    this.loading = true;

    this.chatbotService.sendMessageToDialogflow(this.userMessage).subscribe(response => {
      const botResponse = response.result.fulfillment.speech;
      this.botMessage.push(botResponse);
      this.loading = false;
      this.userMessage = '';
    }, error => {
      console.error(error);
      this.loading = false;
    });
  }
  toggleChatbot() {
    // Get chat container
const chatContainer = document.getElementById('chat-container');

// Button to toggle visibility
const toggleButton = document.getElementById('toggle-button');

// Check if the elements exist and then add an event listener
if (chatContainer && toggleButton) {
    toggleButton.addEventListener('click', () => {
        // Toggle visibility of chat container
        chatContainer.style.display = (chatContainer.style.display === 'none' ? 'block' : 'none');
    });
} else {
    console.log('Chat container or button not found!');
}

  }
  
}



