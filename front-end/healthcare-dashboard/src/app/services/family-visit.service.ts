import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FamilyVisit } from '../classes/familyVisit.model';
import { SignupService } from './signup.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class FamilyVisitService {
  private apiUrl = 'http://localhost:8080/api/family-visits';

  constructor(private http: HttpClient, private router: Router, private signupService: SignupService) {}

  private isTokenExpired(token: string, toleranceInSeconds: number = 0): boolean {
    try {
      const decodedToken: any = jwtDecode(token);
      const expirationDate = decodedToken.exp * 1000; 
      const currentTime = Date.now(); 

      return expirationDate < (currentTime - toleranceInSeconds * 1000);
    } catch (error) {
      console.error('Error decoding token:', error);
      return true; 
    }
  }

  private getHeaders(): HttpHeaders {
    const token = this.signupService.getAuthToken();

    if (!token) {
      console.error('No token found in localStorage');
      this.router.navigate(['/login']);
      throw new Error('No token found');
    }

    if (this.isTokenExpired(token, 60)) {
      console.error('Token is expired');
      this.router.navigate(['/login']);
      throw new Error('Token expired');
    }

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
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

  getAllVisits(): Observable<FamilyVisit[]> {
    const headers = this.getHeaders();

    return this.http.get<FamilyVisit[]>(this.apiUrl, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  getGuardianVisits(): Observable<FamilyVisit[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add any required authentication token or headers here
    });

    return this.http.get<FamilyVisit[]>(`${this.apiUrl}/guardian`, { headers });
  }

  createVisit(familyVisit: FamilyVisit): Observable<FamilyVisit> {
    const headers = this.getHeaders();

    return this.http.post<FamilyVisit>(`${this.apiUrl}/schedule`, familyVisit, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getVisitById(id: number): Observable<FamilyVisit> {
    const headers = this.getHeaders();

    return this.http.get<FamilyVisit>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  deleteVisit(id: number): Observable<void> {
    const headers = this.getHeaders();

    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  getVisitsForPatient(token: string): Observable<FamilyVisit[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  
      'Content-Type': 'application/json'
    });
    return this.http.get<FamilyVisit[]>(`${this.apiUrl}/patient`,{ headers });
    
  }
 
}
