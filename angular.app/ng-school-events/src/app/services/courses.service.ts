import { Injectable } from '@angular/core';
import { ConfigurationService } from "./configuration.service";
import { HttpClientService } from "./http-client.service";
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/map";

@Injectable()
export class CoursesService {
  courseUrl = "courses";
  cYearUrl = "course-years";
  cStudentUrl = "course-students";
  cTeacherUrl = "course-teachers";

  constructor(
    private configSvc: ConfigurationService,
    private http: HttpClientService
  ) {}

  public registerCourse(course: any): Observable<any> {
    return this.http
      .post(`${this.configSvc.backendUrl}/${this.courseUrl}`, course)
      .map(res => res.json());
  }

  public updateCourse(course: any): Observable<any> {
    return this.http
      .put(`${this.configSvc.backendUrl}/${this.courseUrl}/${course.id}`, course)
      .map(res => res.json());
  }

  public getStudents(courseId = ""): Observable<any> {
    return this.http
      .get(
        `${this.configSvc.backendUrl}/${
          this.cStudentUrl
        }?filter[include]=student&filter[where][course-yearId]=${courseId}`
      )
      .map(res => res.json());
  }

  public getCourse(courseId): Observable<any> {
    return this.http
      .get(`${this.configSvc.backendUrl}/${this.courseUrl}/${courseId}`)
      .map(res => res.json());
  }

  public getCourses(filter = "", limit = 10, skip = 0): Observable<any> {
    if (filter) {
      return this.http
        .get(
          `${this.configSvc.backendUrl}/${
            this.courseUrl
        }?filter[limit]=${limit}&filter[skip]=${skip}&filter[where][name][regexp]=/${filter}/i`
        )
        .map(res => res.json());
    } else {
      return this.http
        .get(
          `${this.configSvc.backendUrl}/${
            this.courseUrl
          }?filter[limit]=${limit}&filter[skip]=${skip}&`
        )
        .map(res => res.json());
    }
  }

  public getCoursesCount(filter = ""): Observable<any> {
    if (filter) {
      return this.http
        .get(
          `${this.configSvc.backendUrl}/${
            this.courseUrl
          }/count?where[name][regexp]=/${filter}/i`
        )
        .map(res => res.json());
    } else {
      return this.http
        .get(`${this.configSvc.backendUrl}/${this.courseUrl}/count`)
        .map(res => res.json());
    }
  }

  public getCoursesByYear(filter = "", page = 0): Observable<any> {
    if (filter) {
      return this.http
        .get(
          `${this.configSvc.backendUrl}/${this.cYearUrl}?filter[include]=course`
        )
        .map(res => res.json());
    } else {
      return this.http
        .get(
          `${this.configSvc.backendUrl}/${this.cYearUrl}?filter[include]=course`
        )
        .map(res => res.json());
    }
  }

  public getCourseTeacherRel(courseId, teacherId): Observable<any> {
    return this.http
      .get(
        `${this.configSvc.backendUrl}/${
          this.cTeacherUrl
        }?filter[where][course-yearId]=${courseId}&filter[where][teacherId]=${teacherId}`
      )
      .map(res => res.json());
  }

  public getCourseYears(courseId): Observable<any> {
    return this.http
      .get(
        `${this.configSvc.backendUrl}/${
          this.cYearUrl
        }?filter[include]=school-year&filter[where][courseId]=${courseId}`
      )
      .map(res => res.json());
  }

  public getCourseYearById(courseYearId): Observable<any> {
    return this.http
      .get(
        `${this.configSvc.backendUrl}/${
          this.cYearUrl
        }?filter[include]=school-year&filter[include]=course&filter[where][id]=${courseYearId}`
      )
      .map(res => res.json());
  }

  public getYearCourses(filter = "", page = 0): Observable<any> {
    if (filter) {
      return this.http
        .get(
          `${this.configSvc.backendUrl}/${this.cYearUrl}?filter[include]=course`
        )
        .map(res => res.json());
    } else {
      return this.http
        .get(
          `${this.configSvc.backendUrl}/${this.cYearUrl}?filter[include]=course`
        )
        .map(res => res.json());
    }
  }

  public removeCourse(id): Observable<any> {
    return this.http
      .delete(`${this.configSvc.backendUrl}/${this.courseUrl}/${id}`)
      .map(res => res.json());
  }

  public removeStudentFromCourse(relId): Observable<any> {
    return this.http
      .delete(`${this.configSvc.backendUrl}/${this.cStudentUrl}/${relId}`)
      .map(res => res.json());
  }

  public removeTeacherFromCourse(relId): Observable<any> {
    return this.http
      .delete(`${this.configSvc.backendUrl}/${this.cTeacherUrl}/${relId}`)
      .map(res => res.json());
  }

  public addStudentToCourse(courseStudent): Observable<any> {
    return this.http
      .post(`${this.configSvc.backendUrl}/${this.cStudentUrl}`, courseStudent)
      .map(res => res.json());
  }

  public addTeacherToCourse(courseTeacher): Observable<any> {
    return this.http
      .post(`${this.configSvc.backendUrl}/${this.cTeacherUrl}`, courseTeacher)
      .map(res => res.json());
  }

  public getCourseStudentRel(courseId, studentId): Observable<any> {
    return this.http
      .get(
        `${this.configSvc.backendUrl}/${
          this.cStudentUrl
          }?filter[where][course-yearId]=${courseId}&filter[where][studentId]=${studentId}`
      )
      .map(res => res.json());
  }
}
