import { Component, OnInit } from '@angular/core';
import { TeachersService } from "../../../services/teachers.service";
import { RolesService } from "../../../services/roles.service";

@Component({
  selector: 'app-questions-courses-teacher',
  templateUrl: './questions-courses-teacher.component.html',
  styleUrls: ['./questions-courses-teacher.component.css']
})
export class QuestionsCoursesTeacherComponent implements OnInit {

  courses = [];
  constructor(private teachersSvc: TeachersService, private rolesSvc: RolesService) {}

  ngOnInit() {
    setTimeout(() => {
      this.courses = [];
      this.teachersSvc.getCourses(this.rolesSvc.getTeacherId()).subscribe(teacher => {
        if (teacher.length > 0) {
          this.teachersSvc
            .getCourseYear(teacher)
            .subscribe(courses => {
              this.courses = courses;
              console.log(this.courses);
            });
        }
      });
    }, 500);
  }
}
