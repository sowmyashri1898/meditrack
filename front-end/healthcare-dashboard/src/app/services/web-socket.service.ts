import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: WebSocket;
  private notificationSubject = new Subject<string>();

  constructor() {
    this.socket = new WebSocket('ws://localhost:8080/notifications');
    this.socket.onmessage = (event) => {
      this.notificationSubject.next(event.data);
    };
  }

  getNotifications(): Observable<string> {
    return this.notificationSubject.asObservable();
  }
  
}


