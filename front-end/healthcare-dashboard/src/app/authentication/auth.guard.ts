import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Ensure we're in a browser environment before accessing localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      const userRole = localStorage.getItem('userRole');
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      
      if (!isLoggedIn) {
        this.router.navigate(['/login']); // Redirect to login if not logged in
        return false;
      }

      // Check the user's role and match the route
      if (userRole === 'DOCTOR' && state.url.includes('/doctor-main/doctor-dashboard')) {
        return true; // Allow access to the doctor dashboard
      } else if (userRole === 'PATIENT' && state.url.includes('/navbar/home')) {
        return true; // Allow access to the patient home
      } else  if (userRole === 'GUARDIAN' && state.url.includes('/guardian-main/guardian-dashboard')) {
        return true; // Allow access to the doctor dashboard
      }else  if (userRole === 'ADMIN' && state.url.includes('/admin-main/admin-dashboard')) {
        return true; // Allow access to the doctor dashboard
      }
      else {
        // If the role does not match the route, redirect to login
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      // If not in the browser environment, return false
      return false;
    }
  }
}
