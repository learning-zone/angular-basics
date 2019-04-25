import { Injectable } from '@angular/core';
import { ConfigurationService } from "./configuration.service";
import { HttpClientService } from "./http-client.service";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

@Injectable()
export class ParentsService {
  parentUrl = "parents";
  userUrl = "users";
  sParentUrl = "student-parents";
  cStudentsUrl = "course-students";
  studentsUrl = "students";
  includeCourse = "filter[include]=course-year";
  includeStudent = "filter[include]=student";
  constructor(
    private configSvc: ConfigurationService,
    private http: HttpClientService
  ) {}

  public registerParent(user: any): Observable<any> {
    return this.http
      .post(`${this.configSvc.backendUrl}/${this.userUrl}`, user)
      .map(res => res);
  }

  public registerParentInfo(parentInfo: any): Observable<any> {
    return this.http
      .post(`${this.configSvc.backendUrl}/${this.parentUrl}`, parentInfo)
      .map(res => res.json());
  }

  public updateParentInfo(parentInfo: any): Observable<any> {
    return this.http
      .put(
        `${this.configSvc.backendUrl}/${this.parentUrl}/${parentInfo.id}`,
        parentInfo
      )
      .map(res => res.json());
  }

  public getParents(limit = 10, skip = 0): Observable<any> {
    return this.http
      .get(
        `${this.configSvc.backendUrl}/${
          this.userUrl
        }?filter[include]=parents&&filter[limit]=${limit}&filter[skip]=${skip}&filter[where][userType]=parent`
      )
      .map(res => res.json());
  }

  public getParentsCount(): Observable<any> {
    return this.http
      .get(
        `${this.configSvc.backendUrl}/${
          this.userUrl
        }/count?where[userType]=parent`
      )
      .map(res => res.json());
  }

  public getSons(parenId): Observable<any> {
    return this.http
      .get(
        `${this.configSvc.backendUrl}/${
          this.sParentUrl
      }?filter[include]=parent&filter[include]=student&filter[where][parentId]=${parenId}`
      )
      .map(res => res.json());
  }

  public getSonsNotifications(courseSudents): Observable<any> {
    var where = "filter[where][id]eq]=" + courseSudents[0].studentId;
    if (courseSudents.length > 1)
      where = courseSudents
        .map(
          courseTeacher =>
            "filter[where][id][inq]=" + courseTeacher.studentId
        )
        .join("&");
    return this.http
      .get(
      `${this.configSvc.backendUrl}/students?filter[include]=notifications&${where}`
      )
      .map(res => res.json());
  }


  public getParentByUserId(id: string): Observable<any> {
    return this.http
      .get(
        `${this.configSvc.backendUrl}/${
          this.parentUrl
        }?filter[where][userId]=${id}`
      )
      .map(res => res.json());
  }

  public getStudentByParentId(parentId: string, studentId: string): Observable<any> {
    return this.http
      .get(
        `${this.configSvc.backendUrl}/${
          this.sParentUrl
        }?filter[where][parentId]=${parentId}&filter[where][studentId]=${studentId}`
      )
      .map(res => res.json());
  }

  public getCourseByStudentId(id: string): Observable<any> {
    return this.http
      .get(
        `${this.configSvc.backendUrl}/${this.cStudentsUrl}?${
          this.includeCourse
        }&${this.includeStudent}&filter[where][studentId]=${id}`
      )
      .map(res => res.json());
  }

  public getCourseById(id: string): Observable<any> {
    return this.http
      .get(
        `${this.configSvc.backendUrl}/${this.cStudentsUrl}?${
          this.includeCourse
        }&${this.includeStudent}&filter[where][courseId]=${id}`
      )
      .map(res => res.json());
  }

  public getParent(parentId): Observable<any> {
    return this.http
      .get(`${this.configSvc.backendUrl}/${this.parentUrl}/${parentId}`)
      .map(res => res.json());
  }

  public getStudents(parentId = ""): Observable<any> {
    return this.http
      .get(
        `${this.configSvc.backendUrl}/${
          this.sParentUrl
        }?filter[include]=student&filter[where][parentId]=${parentId}`
      )
      .map(res => res.json());
  }

  public getStudentRel(studentId = ""): Observable<any> {
    return this.http
      .get(
        `${this.configSvc.backendUrl}/${
          this.sParentUrl
        }?filter[include]=student&filter[where][id]=${studentId}`
      )
      .map(res => res.json());
  }

  public getStudent(studentId = ""): Observable<any> {
    return this.http
      .get(
        `${this.configSvc.backendUrl}/${
          this.studentsUrl
        }?filter[where][id]=${studentId}`
      )
      .map(res => res.json());
  }
}
