import { Injectable } from "@angular/core";
import { ConfigurationService } from "./configuration.service";
import { HttpClientService } from "./http-client.service";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

@Injectable({
  providedIn: "root"
})
export class TeachersService {
  constructor(
    private configSvc: ConfigurationService,
    private http: HttpClientService
  ) {}

  public registerTeacher(user: any): Observable<any> {
    return this.http
      .post(this.configSvc.backendUrl + "/users", user)
      .map(res => res);
  }

  public registerTeacherInfo(teacherInfo: any): Observable<any> {
    return this.http
      .post(this.configSvc.backendUrl + "/teachers", teacherInfo)
      .map(res => res.json());
  }

  public updateTeacherInfo(teacherInfo: any): Observable<any> {
    return this.http
      .put(
        this.configSvc.backendUrl + "/teachers/" + teacherInfo.id,
        teacherInfo
      )
      .map(res => res.json());
  }

  public getTeachers(limit = 10, skip = 0): Observable<any> {
    return this.http
      .get(
        `${this.configSvc.backendUrl}/users?filter[include]=teachers&filter[limit]=${limit}&filter[skip]=${skip}&filter[where][userType]=teacher`)
      .map(res => res.json());
  }

  // http://localhost:3000/api/students/count?where[firstName][regexp]=/H/i
  public getTeachersCount(): Observable<any> {
    return this.http
      .get(this.configSvc.backendUrl + "/users/count?where[userType]=teacher")
      .map(res => res.json());
  }

  public getTeacherByUserId(id: string): Observable<any> {
    return this.http
      .get(this.configSvc.backendUrl + "/teachers?filter[where][userId]=" + id)
      .map(res => res.json());
  }

  public getCourses(teacherId = ""): Observable<any> {
    return this.http
      .get(
        this.configSvc.backendUrl +
          "/course-teachers?filter[include]=course-year"
      )
      .map(res => res.json());
  }

  public getCourseYear(courseTeachers): Observable<any> {
    var where = "filter[where][id]eq]=" + courseTeachers[0]["course-year"].id;
    if (courseTeachers.length > 1)
      where = courseTeachers
        .map(
          courseTeacher =>
            "filter[where][id][inq]=" + courseTeacher["course-year"].id
        )
        .join("&");
    return this.http
      .get(
        this.configSvc.backendUrl +
          "/course-years?filter[include]=course&" +
          where
      )
      .map(res => res.json());
  }

  public getTeacher(teacherId): Observable<any> {
    return this.http
      .get(this.configSvc.backendUrl + "/teachers/" + teacherId + "")
      .map(res => res.json());
  }
}
