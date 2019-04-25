import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

import * as socketIo from "socket.io-client";

const SERVER_URL = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  public initSocket(): void {
    this.socket = socketIo(SERVER_URL);
  }

  public send(message: any): void {
    this.socket.emit('message', message);
  }

  public followUpNotification(message: any): void {
    this.socket.emit('followUp', message);
  }

  public followUpReadNotification(message: any): void {
    this.socket.emit('followUpRead', message);
  }

  public annNotification(message: any): void {
    this.socket.emit('anns', message);
  }

  public onMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('message', (data: any) => observer.next(data));
    });
  }

  public onEvent(event: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(event, (data) => observer.next(data));
    });
  }
}
