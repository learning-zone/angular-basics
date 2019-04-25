import { Injectable } from '@angular/core';
import { ConfigurationService } from "./configuration.service";
import { HttpClientService } from "./http-client.service";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

@Injectable({
  providedIn: "root"
})
export class FollowUpsService {
  endPoint = "follow-ups";
  constructor(
    private configSvc: ConfigurationService,
    private http: HttpClientService
  ) {}

  public registerFollowUp(followUp: any): Observable<any> {
    return this.http
      .post(`${this.configSvc.backendUrl}/${this.endPoint}`, followUp)
      .map(res => res);
  }

  public updateFollowUp(followUp: any): Observable<any> {
    return this.http
      .put(`${this.configSvc.backendUrl}/${this.endPoint}/${followUp.id}`, followUp)
      .map(res => res);
  }

  public getFollowUps(studentId, filter = "", limit = 100, skip = 0): Observable<any> {
    if (filter) {
      return this.http
        .get(
          `${this.configSvc.backendUrl}/${
            this.endPoint
        }?filter[limit]=${limit}&filter[skip]=${skip}&filter[where][studentId]=${studentId}&filter[order]=registeredDate DESC&filter[where][year][regexp]=/${filter}/i`
        )
        .map(res => res.json());
    } else {
      return this.http
        .get(
          `${this.configSvc.backendUrl}/${
            this.endPoint
          }?filter[limit]=${limit}&filter[skip]=${skip}&filter[order]=registeredDate DESC&filter[where][studentId]=${studentId}`
        )
        .map(res => res.json());
    }
  }

  public getFollowUpsAll(): Observable<any> {
    return this.http
      .get(
        `${this.configSvc.backendUrl}/${ this.endPoint }?filter[include]=student`
      ).map(res => res.json());
  }

  public getFollowUpsCount(studentId, filter = "", limit = 100, skip = 0): Observable<any> {
    if (filter) {
      return this.http
        .get(
          `${this.configSvc.backendUrl}/${
            this.endPoint
        }/count?&where[studentId]=${studentId}&where[title][regexp]=/${filter}/i`
        )
        .map(res => res.json());
    } else {
      return this.http
        .get(
          `${this.configSvc.backendUrl}/${ this.endPoint }/count?where[studentId]=${studentId}`
        )
        .map(res => res.json());
    }
  }

  public getFollowUpsCountAll(): Observable<any> {
      return this.http
        .get(
          `${this.configSvc.backendUrl}/${ this.endPoint }/count`
        )
        .map(res => res.json());
  }

  public removeFollowUp(folloUpId): Observable<any> {
    return this.http
      .delete(`${this.configSvc.backendUrl}/${this.endPoint}/${folloUpId}`)
      .map(res => res.json());
  }
}
