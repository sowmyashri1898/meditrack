import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HealthcareUser } from '../classes/healthcareUser.model';

@Injectable({
  providedIn: 'root'
})
export class HealthcareServiceService {
  baseUrl = 'http://localhost:8080/api/healthcare';;
 
  constructor(private http: HttpClient) {}

  getSymptoms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/symptoms`);
  }

  getDoctorsBySymptom(symptom: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?symptom=${symptom}`);
  }

  getLocations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/locations`);
  }

  getHospitals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/hospitals`);
  }
  getHealthcareUsers(): Observable<HealthcareUser[]> {
    return this.http.get<HealthcareUser[]>(this.baseUrl);
  }

  addHealthcareUser(user: HealthcareUser): Observable<HealthcareUser> {
    return this.http.post<HealthcareUser>(`${this.baseUrl}/save`, user);  // Post to the /save endpoint for both create and update
  }

  updateHealthcareUser(user: HealthcareUser): Observable<HealthcareUser> {
    return this.http.put<HealthcareUser>(`${this.baseUrl}/${user.userId}`, user);
  }

  deleteHealthcareUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${userId}`);
  }
}
