import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VirtualRealityService {

  private apiUrl = 'http://localhost:3000/virtual-reality'; // Update with your backend API endpoint

  constructor(private http: HttpClient) {}

  getVirtualRealityActivities() {
    return this.http.get<{ name: string, description: string, category: string }[]>('api/vr-activities');
  }
}
