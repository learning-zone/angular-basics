import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CoursesService } from "../../../services/courses.service";
import { SchoolYearsService } from "../../../services/school-years.service";

@Component({
  selector: "app-year-home",
  templateUrl: "./year-home.component.html",
  styleUrls: ["./year-home.component.css"]
})
export class YearHomeComponent implements OnInit {
  assignedCourses = [];
  availableCourses = [];
  yearId = "";
  schoolYear: any;
  confMessage = "";
  closeResult: string;

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private coursesSvc: CoursesService,
    private schoolYearsSvc: SchoolYearsService
  ) {
    this.schoolYear = {};
  }

  ngOnInit() {
    this.yearId = this.route.snapshot.paramMap.get("id");
    this.schoolYearsSvc.getSchoolYear(this.yearId).subscribe(schoolYear => {
      this.schoolYear = schoolYear;
    });

    this.loadCourses();
  }

  loadCourses() {
    this.schoolYearsSvc.getCourses(this.yearId).subscribe(assigned => {
      this.assignedCourses = assigned;
      this.availableCourses = [];
      this.coursesSvc.getCourses('', 500).subscribe(courses => {
        courses.forEach(course => {
          if (!assigned.some(c => c.course.name == course.name)) {
            this.availableCourses.push(course);
          }
        });
      });
    });
  }

  addCourse(course) {
    let courseYear = { courseId: course.id, schoolYearId: this.yearId };
    this.schoolYearsSvc.addCourseToYear(courseYear).subscribe(updatedCourse => {
      this.loadCourses();
    });
  }

  setAsCurrent() {
    this.schoolYear.isCurrent = true;
    this.schoolYearsSvc.updateSchoolYear(this.schoolYear).subscribe( updated => {
      this.schoolYearsSvc.getSchoolYears().subscribe(schoolYears => {
        schoolYears.forEach(schoolYearToUpdate => {
          if (schoolYearToUpdate.id != updated.id) {
            schoolYearToUpdate.isCurrent = false;
            this.schoolYearsSvc
              .updateSchoolYear(schoolYearToUpdate)
              .subscribe(updatedFalse => {});
          }
        });
      });
    });
  }

  removeCourse(courseId) {
    this.schoolYearsSvc.removeCourseFromYear(courseId).subscribe(res => {
      this.confMessage = "Course ";
      console.log("Removed user");
      this.loadCourses();
    });
  }

  addAllCourses() {}

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
