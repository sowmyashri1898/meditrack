import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/auth'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  updatePassword(data: { oldPassword: string; newPassword: string }): Observable<any> {
    const userEmail = localStorage.getItem('userEmail'); // Retrieve logged-in user's ID
    return this.http.put(`${this.apiUrl}/${userEmail}/update-password`, data);
  }

  updateProfile(data: { name: string; email: string; phone: string }): Observable<any> {
    const userEmail = localStorage.getItem('userEmail');
    return this.http.put(`${this.apiUrl}/${userEmail}/update-profile`, data);
  }
}
