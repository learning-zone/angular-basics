import { Component, OnInit } from "@angular/core";
import { ConfigurationService } from "../../../services/configuration.service";
import { AuthService } from "../../../services/auth.service";
import { RolesService } from "../../../services/roles.service";
import { TeachersService } from "../../../services/teachers.service";
import { CoursesService } from "../../../services/courses.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-teacher-course-home",
  templateUrl: "./teacher-course-home.component.html",
  styleUrls: ["./teacher-course-home.component.css"]
})
export class TeacherCourseHomeComponent implements OnInit {
  course: any;
  courseId: string;
  courses: any;
  students: any;
  courseYear: any;
  teacherId: any;
  constructor(
    private route: ActivatedRoute,
    private configSvc: ConfigurationService,
    public authSvc: AuthService,
    public rolesSvc: RolesService,
    public teachersSvc: TeachersService,
    public coursesSvc: CoursesService
  ) {
    this.course = {};
    this.courses = [];
    this.courseYear = {};
    this.students = [];
    this.courseId = "";
  }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get("courseId");
    
    this.coursesSvc.getCourseYearById(this.courseId).subscribe(course => {
      if (course.length > 0) this.courseYear = course[0];
    });

    this.coursesSvc.getStudents(this.courseId).subscribe(students => {
      this.students = students;
    });
  }
}
