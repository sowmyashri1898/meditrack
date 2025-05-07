import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { GuardianDTO } from '../classes/guardian.model';

@Injectable({
  providedIn: 'root'
})
export class GuardianService {
  private apiUrl = 'http://localhost:8080/api/guardians';  // Adjust the API endpoint as needed

  constructor(private http: HttpClient, private router: Router) { }

  private isTokenExpired(token: string, toleranceInSeconds: number = 0): boolean {
    try {
      const decodedToken: any = jwtDecode(token);
      const expirationDate = decodedToken.exp * 1000;  // Expiration date in milliseconds

      const currentTime = Date.now();  // Current time in milliseconds

      return expirationDate < (currentTime - toleranceInSeconds * 1000);  // Check if the token is expired
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;  // If token decoding fails, treat it as expired
    }
  }

  registerGuardian(guardianData: any): Observable<any> {
    const registerUrl = `${this.apiUrl}/register`;
  
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No token found in localStorage');
      this.router.navigate(['/login']);
      return of(); // Return an empty observable
    }
  
    if (this.isTokenExpired(token, 60)) { // Check if the token is expired
      console.error('Token is expired');
      this.router.navigate(['/login']);
      return of(); // Return an empty observable
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Explicitly set content type to JSON
    });
  
    return this.http.post<any>(registerUrl, guardianData, { headers })
      .pipe(
        catchError(this.handleError) // Handle errors if any
      );
  }
  

  // Function to handle errors globally
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
  
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: Code: ${error.status}, Message: ${error.message}`;
    }
  
    if (error.status === 401) {
      console.error('Unauthorized access (401). Redirecting to login...');
      this.router.navigate(['/login']);  // Redirect to login if the error is 401 (unauthorized)
    }
  
    console.error(errorMessage);
  
    return throwError(() => new Error(errorMessage));  // Return an observable error
  }

  // Decode token for extracting user data
  decodeToken(token: string): any {
    const payload = token.split('.')[1];  // Decode the JWT payload
    const decodedPayload = atob(payload);  // Base64 decode the payload
    return JSON.parse(decodedPayload);  // Parse the JSON string
  }

  getGuardianData(): Observable<GuardianDTO> {
    return this.http.get<GuardianDTO>(`${this.apiUrl}/guardian`);
  }

  getGuardianDetails(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Add Bearer token to header
      'Content-Type': 'application/json'   // Specify content type
    });

    return this.http.get<any>(`${this.apiUrl}/details`, { headers })
      .pipe(
        catchError(this.handleError)  // Handle errors if any
      );
  }
}
