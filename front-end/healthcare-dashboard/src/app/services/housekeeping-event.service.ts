import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HousekeepingEventDTO } from '../classes/housekeepingEventDTO.model';

@Injectable({
  providedIn: 'root',
})
export class HousekeepingEventService {
  private apiUrl = 'http://localhost:8080/api/housekeeping-events'; // Base API URL for housekeeping events

  constructor(private http: HttpClient) {}

  /**
   * Get authorization headers for API requests.
   */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No token found in localStorage');
      return new HttpHeaders();
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  /**
   * Fetch all housekeeping events.
   */
  getAllEvents(): Observable<HousekeepingEventDTO[]> {
    const headers = this.getAuthHeaders();
    return this.http
      .get<HousekeepingEventDTO[]>(`${this.apiUrl}/all`, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetch housekeeping events by patient ID.
   */
  getEventsByPatient(patientId: number): Observable<HousekeepingEventDTO[]> {
    const headers = this.getAuthHeaders();
    return this.http
      .get<HousekeepingEventDTO[]>(`${this.apiUrl}/patient/${patientId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetch housekeeping events by service type.
   */
  getEventsByServiceType(serviceType: string): Observable<HousekeepingEventDTO[]> {
    const headers = this.getAuthHeaders();
    return this.http
      .get<HousekeepingEventDTO[]>(`${this.apiUrl}/service-type/${serviceType}`, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Create a new housekeeping event.
   */
  createEvent(event: HousekeepingEventDTO): Observable<HousekeepingEventDTO> {
    const headers = this.getAuthHeaders();
    return this.http
      .post<HousekeepingEventDTO>(`${this.apiUrl}/create`, event, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Update an existing housekeeping event.
   */
  updateEvent(eventId: number, event: HousekeepingEventDTO): Observable<HousekeepingEventDTO> {
    const headers = this.getAuthHeaders();
    return this.http
      .put<HousekeepingEventDTO>(`${this.apiUrl}/update/${eventId}`, event, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Delete a housekeeping event by ID.
   */
  deleteEvent(eventId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http
      .delete<void>(`${this.apiUrl}/delete/${eventId}`, { headers })
      .pipe(catchError(this.handleError));
  }
  getEventDTOById(eventId: number): Observable<HousekeepingEventDTO> {
    const headers = this.getAuthHeaders();
    return this.http.get<HousekeepingEventDTO>(`${this.apiUrl}/${eventId}`, { headers }).pipe(catchError(this.handleError));
  }
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('An unexpected error occurred.'));
  }
}
