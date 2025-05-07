import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BotResponse } from '../classes/boat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:8080/api/chat/send';  // Your backend endpoint

  constructor(private http: HttpClient) {}


  sendSymptom(symptom: string): Observable<BotResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const payload = { text: symptom };
  
    return this.http.post<BotResponse>(this.apiUrl, payload, { headers });
  }
  
}
