import { Injectable } from "@angular/core";
import { ConfigurationService } from "./configuration.service";
import { HttpClientService } from "./http-client.service";
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/map";

@Injectable()
export class StudentsService {
  studentUrl = "students";
  cStudentUrl = "course-students";
  cYearUrl = "course-years";
  sParentUrl = "student-parents";
  notificationsUrl = "notifications";

  constructor(
    private configSvc: ConfigurationService,
    private http: HttpClientService
  ) {}

  public registerStudent(user: any): Observable<any> {
    return this.http
      .post(`${this.configSvc.backendUrl}/${this.studentUrl}`, user)
      .map(res => res.json());
  }

  public updateStudent(student: any): Observable<any> {
    return this.http
      .put(`${this.configSvc.backendUrl}/${this.studentUrl}/${student.id}`, student)
      .map(res => res.json());
  }

  public getStudents(filter = "", limit = 10, skip = 0): Observable<any> {
    if (filter) {
      return this.http
        .get(
          `${this.configSvc.backendUrl}/${
            this.studentUrl
          }?filter[limit]=${limit}&filter[skip]=${skip}&filter[where][firstName][regexp]=/${filter}/i`
        )
        .map(res => res.json());
    } else {
      return this.http
        .get(
          `${this.configSvc.backendUrl}/${ this.studentUrl }/?filter[limit]=${limit}&filter[skip]=${skip}`
        )
        .map(res => res.json());
    }
  }

  // http://localhost:3000/api/students/count?where[firstName][regexp]=/H/i
  public getStudentsCount(filter = ""): Observable<any> {
    if (filter) {
      return this.http
        .get(
          `${this.configSvc.backendUrl}/${
            this.studentUrl
          }/count?where[firstName][regexp]=/${filter}/i`
        )
        .map(res => res.json());
    } else {
      return this.http
        .get(`${this.configSvc.backendUrl}/${this.studentUrl}/count`)
        .map(res => res.json());
    }
  }

  public getStudent(studentId): Observable<any> {
    return this.http
      .get(`${this.configSvc.backendUrl}/${this.studentUrl}/${studentId}`)
      .map(res => res.json());
  }

  public getCourses(studentId = ""): Observable<any> {
    return this.http
      .get(
        `${this.configSvc.backendUrl}/${
          this.cStudentUrl
        }?filter[include]=course-year&filter[include]=student&filter[where][studentId]=${studentId}`
      )
      .map(res => res.json());
  }

  public getCourseYears(courseSudents): Observable<any> {
    var where = "filter[where][id]eq]=" + courseSudents[0]["course-year"].id;
    if (courseSudents.length > 1)
      where = courseSudents
        .map(
          courseTeacher =>
            "filter[where][id][inq]=" + courseTeacher["course-year"].id
        )
        .join("&");
    return this.http
      .get(
        `${this.configSvc.backendUrl}/${
          this.cYearUrl
        }?filter[include]=course&${where}`
      )
      .map(res => res.json());
  }

  public getCourseYearsAll(): Observable<any> {
    return this.http
      .get(
        `${this.configSvc.backendUrl}/${
          this.cYearUrl
        }?filter[include]=course`
      )
      .map(res => res.json());
  }

  public getParents(studentId = ""): Observable<any> {
    return this.http
      .get(
        `${this.configSvc.backendUrl}/${
          this.sParentUrl
        }?filter[include]=parent&filter[include]=student&filter[where][studentId]=${studentId}`
      )
      .map(res => res.json());
  }

  public getNotifications(studentId = ""): Observable<any> {
    return this.http
      .get(
        `${this.configSvc.backendUrl}/${
          this.notificationsUrl
        }?filter[where][studentId]=${studentId}`
      )
      .map(res => res.json());
  }

  public removeStudent(id): Observable<any> {
    return this.http
      .delete(`${this.configSvc.backendUrl}/${this.studentUrl}/${id}`)
      .map(res => res.json());
  }

  public removeParentStudentRel(relId): Observable<any> {
    return this.http
      .delete(`${this.configSvc.backendUrl}/${this.sParentUrl}/${relId}`)
      .map(res => res.json());
  }

  public saveParentStudentRel(relRecord): Observable<any> {
    return this.http
      .post(`${this.configSvc.backendUrl}/${this.sParentUrl}`, relRecord)
      .map(res => res.json());
  }
}
