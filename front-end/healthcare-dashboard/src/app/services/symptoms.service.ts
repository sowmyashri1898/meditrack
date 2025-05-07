import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SymptomsService {

  private apiUrl = 'http://localhost:8080/api/healthcare/process-symptom';  // Your API endpoint

  constructor(private http: HttpClient) {}

  // getSymptoms(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }
  processSymptom(symptom: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { symptom });
  }
  getDoctorsBySpecialty(specialtyId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-doctors-by-specialty/${specialtyId}`);
  }
  
}
