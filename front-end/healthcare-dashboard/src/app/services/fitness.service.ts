import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FitnessService {
  
  private apiUrl = 'http://localhost:3000/fitness-programs';

  constructor(private http: HttpClient) {}

  getFitnessPrograms(): Observable<{ name: string, description: string }[]> {
    return this.http.get<{ name: string, description: string }[]>(this.apiUrl);
  }
}
