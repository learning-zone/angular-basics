import { Injectable } from '@angular/core';
import { ConfigurationService } from "./configuration.service";
import { HttpClientService } from "./http-client.service";
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/map";

@Injectable({
  providedIn: "root"
})
export class AnnsService {
  constructor(
    private configSvc: ConfigurationService,
    private http: HttpClientService
  ) {}

  public registerAnn(ann: any): Observable<any> {
    return this.http
      .post(this.configSvc.backendUrl + "/announcements", ann)
      .map(res => res.json());
  }

  public getAnn(annId): Observable<any> {
    return this.http.get(this.configSvc.backendUrl + "/announcements/" + annId + "").map(res => res.json());
  }

  public getAnns(filter = "", page = 0): Observable<any> {
    if (filter) {
      return this.http
        .get(
          this.configSvc.backendUrl +
            "/announcements?filter[where][title][regexp]=/" +
            filter + "/i"
        )
        .map(res => res.json());
    } else {
      return this.http
        .get(this.configSvc.backendUrl + "/announcements")
        .map(res => res.json());
    }
  }
  
  public deleteAnn(annId): Observable<any> {
    return this.http.delete(this.configSvc.backendUrl + "/announcements/" + annId).map(res => res.json());
  }

}
