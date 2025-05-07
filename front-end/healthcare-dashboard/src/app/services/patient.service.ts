import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Patient } from '../classes/patients.model';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { DoctorDTO } from '../classes/doctor.model';
import { Speciality } from '../classes/speciality.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:8080/api/patients'; 

  constructor(private http: HttpClient,private router: Router) { }

  private isTokenExpired(token: string, toleranceInSeconds: number = 0): boolean {
    try {
      const decodedToken: any = jwtDecode(token);
      const expirationDate = decodedToken.exp * 1000;  

      const currentTime = Date.now();  

      return expirationDate < (currentTime - toleranceInSeconds * 1000);
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;  
    }
  }

  registerPatient(patientData: FormData): Observable<any> {
    const registerUrl = `${this.apiUrl}/register`;
  
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No token found in localStorage');
      this.router.navigate(['/login']);
      return of();  
    }
  
    console.log('Token:', token);
  
    if (this.isTokenExpired(token, 60)) {  
      console.error('Token is expired');
      this.router.navigate(['/login']);
      return of(); 
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  
    console.log('Headers:', headers);
  
    return this.http.post<any>(registerUrl, patientData, { headers })
      .pipe(
        catchError(this.handleError)  
      );
  }
  
  
 

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
  
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: Code: ${error.status}, Message: ${error.message}`;
    }
  
    if (error.status === 401) {
      console.error('Unauthorized access (401). Redirecting to login...');
      this.router.navigate(['/login']);  // Redirect to login
    }
  
    console.error(errorMessage);
  
    return throwError(() => new Error(errorMessage));
  }
  
   decodeToken(token: string): any {
    const payload = token.split('.')[1];  
    const decodedPayload = atob(payload);  
    return JSON.parse(decodedPayload);  
  }

  getPatientData(): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/patient`);
  }
  getPatient(patientId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${patientId}`);
  }
  getPatientById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  updatePatient(patientId: number, patientData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${patientId}`, patientData);
  }

  getPatientDetails(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(`${this.apiUrl}/details`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllSpecialties(): Observable<Speciality[]> {
    return this.http.get<Speciality[]>(`${this.apiUrl}/specialties`);
  }
  getDoctorsBySpecialty(specialty: string): Observable<DoctorDTO[]> {
    return this.http.get<DoctorDTO[]>(`${this.apiUrl}/doctors?specialty=${specialty}`);
  }
}
