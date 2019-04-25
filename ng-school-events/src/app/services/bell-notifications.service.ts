import { Injectable } from '@angular/core';
import { HttpClientService } from "./http-client.service";
import { ConfigurationService } from "./configuration.service";
import { AuthService } from "./auth.service";
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/map";
import "rxjs/add/operator/timeout";
import 'rxjs/add/observable/empty';

@Injectable()
export class BellNotificationsService {

  constructor(private configSvc: ConfigurationService, private authSvc: AuthService, private http: HttpClientService) { }

  public registerNotification(notification: any): Observable<any> {
    return this.http
      .post(this.configSvc.backendUrl + "/notifications", notification)
      .map(res => res.json());
  }

  public removeNotification(notifId): Observable<any> {
    return this.http
      .delete(`${this.configSvc.backendUrl}/notifications/${notifId}`)
      .map(res => res.json());
  }
}
