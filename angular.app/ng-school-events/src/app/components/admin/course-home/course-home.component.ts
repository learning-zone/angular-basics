import { Component, OnInit, Input } from "@angular/core";
import { CoursesService } from "../../../services/courses.service";
import { StudentsService } from "../../../services/students.service";
import { ActivatedRoute } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-course-home",
  templateUrl: "./course-home.component.html",
  styleUrls: ["./course-home.component.css"]
})
export class CourseHomeComponent implements OnInit {
  assignedStudents = [];
  availableStudents = [];
  courseYearId = "";
  courseYear: any;
  confMessage = "";
  closeResult: string;

  @Input() courseInfo: any;

  constructor(
    private coursesSvc: CoursesService,
    private studentsSvc: StudentsService,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {
    this.courseYear = {};
  }

  ngOnInit() {
    this.courseYearId = this.route.snapshot.paramMap.get("courseYearId");

    this.coursesSvc.getCourseYearById(this.courseYearId).subscribe(course => {
      this.courseYear = course[0];
    });

    this.loadStudents();
  }

  addStudent(student) {
    let studentCourse = {
      studentId: student.id,
      "course-yearId": this.courseYearId
    };
    this.coursesSvc
      .addStudentToCourse(studentCourse)
      .subscribe(updatedCourse => {
        this.loadStudents();
      });
  }

  loadStudents() {
    this.coursesSvc
      .getStudents(this.courseYearId)
      .subscribe(assigned => {
        this.assignedStudents = assigned;
        if (this.assignedStudents.length > 0) {
          this.studentsSvc.getStudents('', 500).subscribe(students => {
            students.forEach(student => {
              if (!this.assignedStudents.some(s => s.studentId == student.id)) {
                this.availableStudents.push(student);
              }
              this.availableStudents.sort((n1, n2) =>
                n1.firstName.localeCompare(n2.firstName)
              );
            });
          });
        }
        else {
          this.studentsSvc
            .getStudents("", 500)
            .subscribe(students => {
              this.availableStudents = students.sort((n1, n2) =>
                n1.firstName.localeCompare(n2.firstName)
              );
            });
        }
      });
  }

  removeStudent(studentId) {
    this.coursesSvc.removeStudentFromCourse(studentId).subscribe(res => {
      this.confMessage = "Student removed";
      this.loadStudents();
    });
  }

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
