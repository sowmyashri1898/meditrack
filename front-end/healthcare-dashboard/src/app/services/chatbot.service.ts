// src/app/services/chatbot.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private dialogflowUrl = 'https://api.dialogflow.com/v1/query?v=20150910';
  private dialogflowToken = 'YOUR_DIALOGFLOW_ACCESS_TOKEN';  // Replace with your Dialogflow access token

  constructor(private http: HttpClient) { }

  sendMessageToDialogflow(message: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.dialogflowToken}`);

    const body = {
      query: message,
      lang: 'en',
      sessionId: '12345'  // Can be dynamically generated per user
    };

    return this.http.post(this.dialogflowUrl, body, { headers });
  }
}
