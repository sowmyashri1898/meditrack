import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private apiUrl = '/api/games'; 

  constructor(private http: HttpClient) {}

  getGames() {
    const apiKey = 'YOUR_API_KEY';  
    const url = `${this.apiUrl}?key=${apiKey}`;  

    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log('Game Data:', data);
        return data;
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }


  getGamingActivities(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }
}
