import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private baseUrl = 'http://localhost:8080/api/activities'; // Update the port if your backend runs on a different one

  constructor(private http: HttpClient) {}

  fetchActivities(filters: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/search`, filters);
  }
}
