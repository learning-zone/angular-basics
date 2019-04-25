import { Component, OnInit } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { CoursesService } from "../../../services/courses.service";
import { ConfigurationService } from "../../../services/configuration.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-course-list-admin",
  templateUrl: "./course-list-admin.component.html",
  styleUrls: ["./course-list-admin.component.css"]
})
export class CourseListAdminComponent implements OnInit {
  closeResult: string;
  newCourse = {};
  editCourse = {};
  courseList = [];
  searchText = "";

  // pagination attributes
  pages = 0;
  currentPage = 1;
  rangePages = [];

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private coursesSvc: CoursesService,
    private confSvc: ConfigurationService
  ) {}

  ngOnInit() {
    if (this.route.snapshot.queryParams["page"]) {
      this.currentPage = Number(this.route.snapshot.queryParams["page"]);
    }

    this.loadCourses();
  }

  loadCourses() {
    this.coursesSvc
      .getCourses(
        this.searchText,
        this.confSvc.pageSize,
        (this.currentPage - 1) * this.confSvc.pageSize
      )
      .subscribe(courses => (this.courseList = courses));

    this.coursesSvc.getCoursesCount(this.searchText).subscribe(countInfo => {
      this.pages = Math.round(countInfo.count / this.confSvc.pageSize);
      const range = (from, to, step) =>
        Array(Math.floor((to - from) / step) + 1)
          .fill(0)
          .map((v, i) => from + i * step);
      this.rangePages = range(1, this.pages, 1);
    });
  }

  saveCourse() {
    let newCourse = this.newCourse;
    this.coursesSvc.registerCourse(newCourse).subscribe(course => {
      this.loadCourses();
    });
  }

  updateCourse() {
    this.coursesSvc.updateCourse(this.editCourse).subscribe(course => {
      this.loadCourses();
    });
  }

  removeCourse(id) {
    this.coursesSvc.removeCourse(id).subscribe(removed => {
      this.loadCourses();
    });
  }

  open(content) {
    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  
  openEdit(toEdit, content) {
    this.editCourse = toEdit;
    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  search() {
    this.loadCourses();
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
