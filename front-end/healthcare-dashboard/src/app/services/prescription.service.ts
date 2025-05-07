import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Prescription } from '../classes/prescription.model';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  private apiUrl = 'http://localhost:8080/api/prescriptions'; // Backend API URL

  constructor(private http: HttpClient) {}

  createPrescription(prescription: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No token found in localStorage');
      return throwError(() => new Error('Unauthorized: No token found.'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiUrl, prescription, { headers })
      .pipe(catchError(this.handleError));
  }

  getMedicationOptions(): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<any[]>(`${this.apiUrl}/medications`, { headers })
      .pipe(catchError(this.handleError));
  }

  getDosageOptions(): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<any[]>(`${this.apiUrl}/dosages`, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('An error occurred while making the request.'));
  }
  getPatientPrescriptions(token:string): Observable<Prescription[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  
      'Content-Type': 'application/json'
    });

    return this.http.get<Prescription[]>(`${this.apiUrl}/patient`, { headers })
    .pipe(
      catchError(this.handleError)
    ) ;
  }

  getDoctorPrescriptions(token:string): Observable<Prescription[]> {
    
  //   const token = localStorage.getItem('authToken');  
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,  
  //   });

  //   return this.http.get<Prescription[]>(`${this.apiUrl}/doctor`, { headers });
  // }
   const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  
        'Content-Type': 'application/json'
      });
  
      return this.http.get<Prescription[]>(`${this.apiUrl}/doctor`, { headers })
      .pipe(
        catchError(this.handleError)
      ) ;
    }
}
