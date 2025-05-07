import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppointmentDTO } from '../classes/appointment.model';
import { HealthcareUser } from '../classes/healthcareUser.model';
import { Symptom } from '../classes/symptoms.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'http://localhost:8080/api/appointments';

  constructor(private http: HttpClient,private router:Router) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No token found in localStorage');
      return new HttpHeaders();
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  createAppointment(appointment: any): Observable<AppointmentDTO> {
    const headers = this.getAuthHeaders();
    if (!headers.has('Authorization')) {
      console.error('No token found in localStorage');
      this.router.navigate(['/login']);
      return of();
    }
    return this.http.post<AppointmentDTO>(`${this.apiUrl}`, appointment, { headers })
      .pipe(catchError(this.handleError));
  }

  getAllAppointments(): Observable<AppointmentDTO[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<AppointmentDTO[]>(`${this.apiUrl}`, { headers })
      .pipe(catchError(this.handleError));
  }

  getAppointmentById(appointmentId: number): Observable<AppointmentDTO> {
    const headers = this.getAuthHeaders();
    return this.http.get<AppointmentDTO>(`${this.apiUrl}/${appointmentId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  updateAppointment(appointmentId: number, appointment: AppointmentDTO): Observable<AppointmentDTO> {
    const headers = this.getAuthHeaders();
    return this.http.put<AppointmentDTO>(`${this.apiUrl}/${appointmentId}`, appointment, { headers })
      .pipe(catchError(this.handleError));
  }

  deleteAppointment(appointmentId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${appointmentId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  getAllSymptoms(): Observable<Symptom[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Symptom[]>(`${this.apiUrl}/symptoms`, { headers })
      .pipe(catchError(this.handleError));
  }

  getDoctorsBySymptom(symptomId: number): Observable<HealthcareUser[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<HealthcareUser[]>(`${this.apiUrl}/doctors/${symptomId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return of();
  }

  getPatientAppointments(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(`${this.apiUrl}/patient`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  getDoctorAppointments(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  
      'Content-Type': 'application/json'
    });

    return this.http.get<AppointmentDTO[]>(`${this.apiUrl}/doctor`, { headers })
    .pipe(
      catchError(this.handleError)
    ) ;
  }
  sendNotification(recipientId: number, message: string): Observable<any> {
    const headers = this.getAuthHeaders();
    if (!headers.has('Authorization')) {
      console.error('No token found in localStorage');
      return throwError(() => new Error('Unauthorized: No token found.'));
    }
  
    return this.http.post(`${this.apiUrl}/send-notification`, {
      recipientId,
      message,
    }, { headers }).pipe(
      catchError((error) => {
        console.error('Error sending notification:', error);
        if (error.status === 401) {
          return throwError(() => new Error('Unauthorized: Please login again.'));
        } else if (error.status === 500) {
          return throwError(() => new Error('Server error: Please try again later.'));
        }
        return throwError(() => new Error('An unexpected error occurred.'));
      })
    );
  }
  
  getCompletedAppointments(): Observable<AppointmentDTO[]> {
    return this.getAllAppointments().pipe(
      catchError(this.handleError),
      map((appointments: AppointmentDTO[]) => {
        // Filter appointments based on their status being 'COMPLETED'
        return appointments.filter(appointment => appointment.status === 'COMPLETED');
      })
    );
  }
  updateAppointmentStatus(appointmentId: number, status: string): Observable<AppointmentDTO> {
    const headers = this.getAuthHeaders();
    const body = { status };  // The body will contain the new status to update
    
    return this.http.put<AppointmentDTO>(`${this.apiUrl}/${appointmentId}/status`, body, { headers })
      .pipe(catchError(this.handleError));
  }
  cancelAppointment(appointmentId: number): Observable<AppointmentDTO> {
    const headers = this.getAuthHeaders();
    return this.http.put<AppointmentDTO>(`${this.apiUrl}/${appointmentId}/cancel`, {}, { headers })
      .pipe(catchError(this.handleError));
  }
  getCompletedAppointmentsForDoctor(doctorId: number): Observable<AppointmentDTO[]> {
    return this.getAllAppointments().pipe(
      catchError(this.handleError),
      map((appointments: AppointmentDTO[]) => {
        // Filter appointments based on doctorId and status 'COMPLETED'
        return appointments.filter(appointment => 
          appointment.status === 'COMPLETED' && appointment.doctorId === doctorId);
      })
    );
  }
  
  getCompletedAppointmentsForPatient(patientId: number): Observable<AppointmentDTO[]> {
    return this.getAllAppointments().pipe(
      catchError(this.handleError),
      map((appointments: AppointmentDTO[]) => {
        // Filter appointments based on patientId and status 'COMPLETED'
        return appointments.filter(appointment => 
          appointment.status === 'COMPLETED' && appointment.patientId === patientId);
      })
    );
  }
  
}
