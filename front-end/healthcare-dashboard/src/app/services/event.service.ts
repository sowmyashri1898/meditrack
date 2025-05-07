import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EventDTO } from '../classes/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:8080/api/events'; 

  constructor(private http: HttpClient, private router: Router) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No token found in localStorage');
      return new HttpHeaders();
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getAllEventDTOs(): Observable<EventDTO[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<EventDTO[]>(`${this.apiUrl}`, { headers }).pipe(catchError(this.handleError));
  }

  getEventDTOById(eventId: number): Observable<EventDTO> {
    const headers = this.getAuthHeaders();
    return this.http.get<EventDTO>(`${this.apiUrl}/${eventId}`, { headers }).pipe(catchError(this.handleError));
  }

  createEventDTO(event: EventDTO): Observable<EventDTO> {
    const headers = this.getAuthHeaders();
    if (!headers.has('Authorization')) {
      console.error('No token found in localStorage');
      this.router.navigate(['/login']);
      return of();
    }
    return this.http.post<EventDTO>(`${this.apiUrl}/create`, event, { headers }).pipe(catchError(this.handleError));
  }

  updateEventDTO(eventId: number, event: EventDTO): Observable<EventDTO> {
    const headers = this.getAuthHeaders();
    return this.http.put<EventDTO>(`${this.apiUrl}/update/${eventId}`, event, { headers }).pipe(catchError(this.handleError));
  }

  deleteEventDTO(eventId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/delete/${eventId}`, { headers }).pipe(catchError(this.handleError));
  }

  joinEventDTO(eventId: number, userId: number): Observable<string> {
    const headers = this.getAuthHeaders();
    return this.http.post<string>(`${this.apiUrl}/join/${eventId}`, { userId }, { headers }).pipe(catchError(this.handleError));
  }

  getSimilarEventDTOs(eventId: number): Observable<EventDTO[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<EventDTO[]>(`${this.apiUrl}/similar/${eventId}`, { headers }).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('An unexpected error occurred.'));
  }

  sendNotification(recipientId: number, message: string): Observable<any> {
    const headers = this.getAuthHeaders();
    if (!headers.has('Authorization')) {
      console.error('No token found in localStorage');
      return throwError(() => new Error('Unauthorized: No token found.'));
    }

    return this.http
      .post(`${this.apiUrl}/send-notification`, { recipientId, message }, { headers })
      .pipe(catchError(this.handleError));
  }
}
