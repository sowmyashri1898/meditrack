import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmartScreensService {

  private apiUrl = 'http://localhost:8080/smart-screens';

  constructor(private http: HttpClient) {}

  getSmartScreenFeatures(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }}
