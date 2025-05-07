import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DoctorVisit } from '../classes/doctorvisit.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorVisitService {

  private apiUrl = 'http://localhost:8080/api/doctor-visits'; // Spring Boot API URL

  constructor(private http: HttpClient) { }

  getVisits(doctorId: number): Observable<DoctorVisit[]> {
    return this.http.get<DoctorVisit[]>(`${this.apiUrl}/doctor/${doctorId}`);
  }

  createVisit(visit: DoctorVisit): Observable<DoctorVisit> {
    return this.http.post<DoctorVisit>(`${this.apiUrl}`, visit);
  }
}
