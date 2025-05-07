import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { catchError, Observable, of, throwError } from 'rxjs';
import { DoctorVisit } from '../classes/doctorvisit.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {


  private apiUrl = 'http://localhost:8080/api/healthcare';  // Your API endpoint

  constructor(private http: HttpClient,private router:Router) {}

  getDoctorsBySymptom(symptom: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?symptom=${symptom}`);
  }
  getDoctor(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  registerDoctor(doctorData: FormData): Observable<any> {
    const registerUrl = `${this.apiUrl}/doctor/register`;
  
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
  
    return this.http.post<any>(registerUrl, doctorData, { headers })
      .pipe(
        catchError(this.handleError)  
      );
  }
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
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
  
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: Code: ${error.status}, Message: ${error.message}`;
    }
  
    if (error.status === 401) {
      console.error('Unauthorized access (401). Redirecting to login...');
      this.router.navigate(['/login']);  
    }
  
    console.error(errorMessage);
  
    return throwError(() => new Error(errorMessage));
  }

  getDoctorDetails(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(`${this.apiUrl}/doctor/details`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
 
}
