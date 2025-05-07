import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../classes/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:8080/api/contact';

  constructor(private http: HttpClient) {}

  sendContactMessage(contact: Contact): Observable<any> {
    return this.http.post<any>(this.apiUrl, contact, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
}
