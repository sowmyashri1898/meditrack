import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { SignupService } from './signup.service';
import { isPlatformBrowser } from '@angular/common';
import {jwtDecode} from 'jwt-decode';  // Import jwt-decode library

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private isAuthenticated:boolean = false;
  constructor(private signupService: SignupService, private router: Router,@Inject(PLATFORM_ID) private platformId: any) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.signupService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token); // Store token in localStorage
    }
  }

  // Retrieve token from localStorage (only available in browser environment)
  getToken(): string | null {
    // if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token'); // Retrieve token from localStorage
    // }
    // return null;  // Return null if not in the browser
  }

 private isTokenExpired(token: string): boolean {
    try {
      // Decode the token using jwt-decode
      const decodedToken: any = jwtDecode(token);

      // Check if the token has the 'exp' claim (expiration time)
      if (!decodedToken.exp) {
        return true; // If no expiration field is present, assume expired
      }

      // Convert expiration time from seconds to milliseconds
      const expirationDate = decodedToken.exp * 1000;

      // Return whether the token is expired
      return expirationDate < Date.now();  // Compare expiration date with current time
    } catch (error) {
      console.error("Error decoding token:", error);  // Log any errors during decoding
      return true;  // If decoding fails, consider the token expired
    }
  }

  // Clear token from localStorage (e.g., on logout)
  clearToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token'); // Remove token from localStorage
    }
  }
  
}
