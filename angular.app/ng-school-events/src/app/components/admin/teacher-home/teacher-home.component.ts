import { Component, OnInit, Input } from "@angular/core";
import { TeachersService } from "../../../services/teachers.service";
import { CoursesService } from "../../../services/courses.service";
import { ActivatedRoute } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-teacher-home",
  templateUrl: "./teacher-home.component.html",
  styleUrls: ["./teacher-home.component.css"]
})
export class TeacherHomeComponent implements OnInit {
  assignedCourses = [];
  availableCourses = [];
  teacherId = "";
  teacher: any;
  confMessage = "";
  closeResult: string;

  constructor(
    private teachersSvc: TeachersService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private coursesSvc: CoursesService
  ) {
    this.teacher = {};
  }

  ngOnInit() {
    this.teacherId = this.route.snapshot.paramMap.get("id");
    this.teachersSvc.getTeacher(this.teacherId).subscribe(teacher => {
      this.teacher = teacher;
    });


    setTimeout(() => {
    this.loadCourses();
     }, 1000);
  }

  loadCourses() {
    this.assignedCourses = [];
    this.availableCourses = [];
    this.teachersSvc.getCourses(this.teacherId).subscribe(acoursesAux => {
      if (acoursesAux.length > 0) {
        this.teachersSvc
            .getCourseYear(acoursesAux)
            .subscribe(acourses => {
              this.assignedCourses = acourses;
              this.coursesSvc.getYearCourses().subscribe(courses => {
                courses.forEach(course => {
                if (!this.assignedCourses.some(s => (s.courseId == course.courseId))) {
                    this.availableCourses.push(course);
                  }
                });
              });
            });
      } else {
        this.coursesSvc.getYearCourses().subscribe(courses => {
          this.availableCourses = courses;
        });
      }
    });
  }

  addCourse(course) {
    let courseTeacher = { "course-yearId": course.id, teacherId: this.teacherId };
    this.coursesSvc
      .addTeacherToCourse(courseTeacher)
      .subscribe(updatedCourse => {
        this.loadCourses();
      });
  }

  removeCourse(courseId) {
    this.coursesSvc.getCourseTeacherRel(courseId, this.teacherId).subscribe( rel => {
      this.coursesSvc
        .removeTeacherFromCourse(rel[0].id)
        .subscribe(res => {
          this.confMessage = "Course Removed";
          this.loadCourses();
        });
    });
  }

  addAllCourses() { }

  open(content) {
    this.modalService.open(content, { size: 'lg' }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

}
