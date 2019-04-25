import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import { ConfigurationService } from "./configuration.service";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

@Injectable()
export class LoginService {

  constructor(
    private configSvc: ConfigurationService, 
    private authSvc: AuthService, private http: Http
  ) {
  }

  public login(user: any): Observable<any> {
    return this.http.post(
      `${this.configSvc.backendUrl}/users/login`,
      user
    ).map(res => res.json());
  }

}
