import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  public apiUrl = 'http://localhost:8080/api/auth'; 

  constructor(private http: HttpClient, private router: Router) {}

  signUp(user: any): Observable<any> {
    const signupUrl = `${this.apiUrl}/signup`;
    return this.http.post<any>(signupUrl, user).pipe(
      catchError(this.handleError)
    );
  }
  login(credentials: any): Observable<any> {
    const loginUrl = `${this.apiUrl}/login`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    return this.http.post<any>(loginUrl, credentials, { headers }).pipe(
      map((response) => {
        console.log(response);  
        if (response && response.token) {
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('authToken', response.token);  
            localStorage.setItem('isLoggedIn', 'true'); 
  
            if (response.role) {
              localStorage.setItem('userRole', response.role);

            }
            localStorage.setItem('userEmail', response.email);  // Assuming the email is returned from the API
            localStorage.setItem('userId', response.id);  // Assuming the email is returned from the API

            if (response.role === 'DOCTOR') {
              this.router.navigate(['/doctor-main/doctor-dashboard']);
            } else if (response.role === 'PATIENT') {
              this.router.navigate(['/navbar/home']);
            } else if (response.role === 'ADMIN') {
              this.router.navigate(['admin/dashboard']);
            }else if(response.role === 'GUARDIAN') {
              this.router.navigate(['/guardian-main/guardian-dashboard']);
            }
          }
        }
        return response;
      }),
      catchError((error) => {
        let errorMessage = 'An error occurred during login';
        if (error.status === 401) {
          errorMessage = 'Invalid email or password.';
        } else if (error.status === 500) {
          errorMessage = 'Internal server error, please try again later.';
        }
        return throwError(() => new Error(errorMessage));  // Propagate the error
      })
    );
  }
  
  

  

  setLoginStatus(token: string, role: string): void {
    localStorage.setItem('authToken', token);  
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role); 
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true' ;
  
  }

  // getAuthToken(): string | null {
  //   return localStorage.getItem('authToken');  // Get the auth token from localStorage
  // }

  isAuthenticated(): boolean {
    return this.getAuthToken() !== null;  
  }

  setUserRole(role: string): void {
    localStorage.setItem('userRole', role);  
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');  
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);  
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.setItem('isLoggedIn', 'false');  
    localStorage.removeItem('userRole'); 
    this.router.navigate(['/header/login']);  
  }
   isTokenExpired(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token);

      if (!decodedToken.exp) {
        return true; 
      }

      const expirationDate = decodedToken.exp * 1000;

      return expirationDate < Date.now();  
    } catch (error) {
      console.error("Error decoding token:", error);  
      return true; 
    }
  }
  getAuthToken(): string {
    if (typeof window !== 'undefined' && localStorage.getItem('authToken')) {
      return localStorage.getItem('authToken') as string;  
    } else {
      return '';  
    }
  }
  uploadProfilePicture(file: File): Observable<{ path: string }> {
    const formData = new FormData();
    formData.append('profilePicture', file);

    // Get the token from local storage or a service
    const token = localStorage.getItem('token'); // Adjust based on your token storage strategy
    console.log(token);

    // Set up headers to include the Authorization token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Make the HTTP POST request with headers and return the Observable
    return this.http.post<{ path: string }>('/api/upload', formData, { headers });
  }
}
