import { Injectable } from '@angular/core';
import { ConfigurationService } from "./configuration.service";
import { HttpClientService } from "./http-client.service";
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/map";

@Injectable({
  providedIn: "root"
})
export class SchoolYearsService {
  constructor(
    private configSvc: ConfigurationService,
    private http: HttpClientService
  ) {}

  public registerSchoolYear(schoolYear: any): Observable<any> {
    return this.http
      .post(this.configSvc.backendUrl + "/school-years", schoolYear)
      .map(res => res.json());
  }
  
  public updateSchoolYear(schoolYear: any): Observable<any> {
    return this.http
      .put(`${this.configSvc.backendUrl}/school-years/${schoolYear.id}`, schoolYear)
      .map(res => res.json());
  }

  public addCourseToYear(courseYear): Observable<any> {
    return this.http
      .post(this.configSvc.backendUrl + "/course-years", courseYear)
      .map(res => res.json());
  }

  public getSchoolYears(filter = "", limit = 100, skip = 0): Observable<any> {
    if (filter) {
      return this.http
        .get(
          `${this.configSvc.backendUrl}/school-years?filter[limit]=${limit}&filter[skip]=${skip}&filter[where][year][regexp]=/${filter}/i`
        )
        .map(res => res.json());
    } else {
      return this.http
        .get(
          `${
            this.configSvc.backendUrl
          }/school-years?filter[limit]=${limit}&filter[skip]=${skip}`
        )
        .map(res => res.json());
    }
  }

  public getSchoolYearsCount(filter = ""): Observable<any> {
    if (filter) {
      return this.http
        .get(
          `${this.configSvc.backendUrl}/school-years/count?where[year][regexp]=/${filter}/i`
        )
        .map(res => res.json());
    } else {
      return this.http
        .get(`${this.configSvc.backendUrl}/school-years/count`)
        .map(res => res.json());
    }
  }

  public getCourses(yearId = ""): Observable<any> {
    return this.http
      .get(`${this.configSvc.backendUrl}/course-years?filter[include]=school-year&filter[include]=course&filter[where][schoolYearId]=${yearId}`
      )
      .map(res => res.json());
  }

  public getSchoolYearBack(yearId): Observable<any> {
    return this.http
      .get(
        this.configSvc.backendUrl +
          "/school-years/" +
          yearId +
          "?filter[include]=courses"
      )
      .map(res => res.json());
  }

  public getSchoolYear(yearId): Observable<any> {
    return this.http
      .get(this.configSvc.backendUrl + "/school-years/" + yearId + "")
      .map(res => res.json());
  }

  public removeCourseFromYear(courseId): Observable<any> {
    return this.http
      .delete(this.configSvc.backendUrl + "/course-years/" + courseId)
      .map(res => res.json());
  }

  public removeSchoolYear(id: any): Observable<any> {
    return this.http
      .delete(this.configSvc.backendUrl + "/school-years/" + id)
      .map(res => res.json());
  }
}
