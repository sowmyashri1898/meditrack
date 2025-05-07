import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '../classes/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = 'http://localhost:8080/api/messages'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  getMessagesByRole(role: string, userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/role/${role}/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  getMessageById(messageId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${messageId}`).pipe(
      catchError(this.handleError)
    );
  }

  // sendMessage(message: any): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/send`, message, this.getHttpOptions()).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // markAsRead(messageId: number): Observable<any> {
  //   return this.http.patch<any>(`${this.apiUrl}/markAsRead/${messageId}`, null, this.getHttpOptions()).pipe(
  //     catchError(this.handleError)
  //   );
  // }
  markAsRead(id: number): Observable<Message> {
    const url = `${this.apiUrl}/${id}/read`;
    return this.http.put<Message>(url, {}, { headers: this.getAuthHeaders() });
  }
  
  markAsUnread(id: number): Observable<Message> {
    const url = `${this.apiUrl}/${id}/unread`;
    return this.http.put<Message>(url, {}, { headers: this.getAuthHeaders() });
  }
  
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Replace with actual storage logic
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
  
  
  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    throw error;
  }

  private getHttpOptions() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add authorization headers if necessary
      // 'Authorization': `Bearer ${yourAuthToken}`
    });

    return { headers };
  }
  sendMessage(request: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/send`, request);
  }

  getInboxMessages(loggedInUserEmail: string): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/inbox?email=${loggedInUserEmail}`).pipe(
      catchError(this.handleError)
    );
  }

  getOutboxMessages(loggedInUserEmail: string): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/outbox?email=${loggedInUserEmail}`).pipe(
      catchError(this.handleError)
    ); 
   }

  archiveMessage(messageId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/archive/${messageId}`, {});
  }
}
