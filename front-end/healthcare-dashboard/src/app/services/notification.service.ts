import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { catchError, retryWhen, delay, take } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private socket$!: WebSocketSubject<any>;
  private errorSubject: Subject<any> = new Subject();
  private reconnectAttempts = 0;
  private baseUrl = 'http://localhost:8080/api/notifications'; // Replace with your backend API URL

  constructor(private http:HttpClient) {
    this.connect(); 
  }

  private connect() {
    // Get the token (assumes you have a method to fetch it from localStorage or a service)
    const token = localStorage.getItem('authToken'); // Adjust based on your token storage
    const url = `ws://localhost:8080/notifications?token=${token}`;

    this.socket$ = new WebSocketSubject(url);

    this.socket$.pipe(
      retryWhen(errors =>
        errors.pipe(
          delay(2000), // Retry every 2 seconds
          take(5) // Retry 5 times before giving up
        )
      ),
      catchError((error) => {
        console.error('WebSocket connection failed:', error);
        this.errorSubject.next(error);
        throw error; // Allow observable chain to continue
      })
    ).subscribe({
      next: (message) => {
        console.log('Received message:', message);
      },
      error: (error) => {
        console.error('WebSocket error:', error);
        this.errorSubject.next(error);
      },
      complete: () => {
        console.log('WebSocket connection closed');
      }
    });
  }

  sendMessage(message: string) {
    // If the socket is closed, try reconnecting
    if (this.socket$.closed) {
      console.log('Socket is closed. Reconnecting...');
      this.reconnect();
    } else {
      // Otherwise, send the message
      this.socket$.next(message);
    }
  }

  // getNotifications(): Observable<any> {
  //   return this.socket$.asObservable();
  // }

  getErrors(): Observable<any> {
    return this.errorSubject.asObservable();
  }

  closeConnection() {
    if (this.socket$ && !this.socket$.closed) {
      this.socket$.complete(); // Close the WebSocket gracefully
    }
  }

  private reconnect() {
    if (this.reconnectAttempts < 5) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect... (${this.reconnectAttempts}/5)`);
      this.connect();
    } else {
      console.error('Max reconnect attempts reached');
    }
  }

  private notifications = new BehaviorSubject<string[]>([]);

  getSavedNotifications(token: string):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  
      'Content-Type': 'application/json'
    });
    return this.http.get<any>(`${this.baseUrl}`, { headers })
    .pipe(
      catchError(this.handleError)
    );
    // return this.http.get<string[]>(this.baseUrl); // Fetch notifications from the backend
  }
  // handleError(handleError: any): import("rxjs").OperatorFunction<any, any> {
  //   throw new Error('Method not implemented.');
  // }
  
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return of();
  }
  sendNotification(recipientId: number, message: string): void {
    const currentNotifications = this.notifications.getValue();
    this.notifications.next([...currentNotifications, message]);
  
    // Send the notification to the backend API
    const apiUrl = `${this.baseUrl}/send/${recipientId}`;
    this.http.post(apiUrl, { message }).subscribe(
      () => console.log('Notification saved to server.'),
      (error) => console.error('Error saving notification:', error)
    );
  
    // Optional: If WebSocket is active, push the notification directly
    if (this.socket$) {
      const notificationPayload = { recipientId, message };
      this.socket$.next(notificationPayload);
    }
  }
  getDoctorNotifications(token: string):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  
      'Content-Type': 'application/json'
    });
    return this.http.get<any>(`${this.baseUrl}/doctor`, { headers })
    .pipe(
      catchError(this.handleError)
    );
    // return this.http.get<string[]>(this.baseUrl); // Fetch notifications from the backend
  }


  clearNotifications(): void {
    this.notifications.next([]);
  }

}
