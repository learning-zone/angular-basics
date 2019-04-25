import { Injectable } from '@angular/core';
import { HttpClientService } from "./http-client.service";
import { ConfigurationService } from "./configuration.service";
import { AuthService } from "./auth.service";
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/map";
import "rxjs/add/operator/timeout";
import 'rxjs/add/observable/empty' 


@Injectable()
export class UsersService {
  constructor(private configSvc: ConfigurationService, private authSvc: AuthService, private http: HttpClientService) {
  }

  public getCurrentUser(): Observable<any> {
    if (this.authSvc.getCurrentUserId()) 
    {
      return this.http
        .get(this.configSvc.backendUrl + "/users/" + this.authSvc.getCurrentUserId() + "?filter[include]=teachers&filter[include]=parents")
      .timeout(500)
      .map(res => res.json());
    } else {
      return Observable.empty();;
    }
      
  }

  public registerAdmin(user: any): Observable<any> {
    return this.http
      .post(this.configSvc.backendUrl + "/users", user)
      .map(res => res.json());
  }

  public changePasswordFirstTime(user: any, token: string): Observable<any> {
    return this.http
      .post(
        this.configSvc.backendUrl +
          "/users/change-password?access_token=" +
          token,
        user
      )
      .map(res => res);
  }


  public changePassword(user: any): Observable<any> {
    return this.http
      .post(
        this.configSvc.backendUrl +
          "/users/change-password",
        user
      )
      .map(res => res);
  }


  public getCurrentUserId(): string {
    return this.authSvc.getCurrentUserId();
  }

  public getUserById(id: string): Observable<any> {
    return this.http
      .get(this.configSvc.backendUrl + "/users/" + id)
      .map(res => res.json());
  }
}
