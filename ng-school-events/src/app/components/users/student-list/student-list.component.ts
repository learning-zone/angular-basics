import { Component, OnInit } from '@angular/core';
import { StudentsService } from "../../../services/students.service";
import { ConfigurationService } from "../../../services/configuration.service";
import { ActivatedRoute } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.css"]
})
export class StudentListComponent implements OnInit {
  students: any[];
  searchText = "";
  newStudent = {};
  editStudent = {};
  closeResult: string;

  pages = 0;
  currentPage = 1;
  rangePages = [];

  constructor(
    private route: ActivatedRoute,
    private studentsSvc: StudentsService,
    private modalService: NgbModal,
    private confSvc: ConfigurationService
  ) {}

  ngOnInit() {
    if (this.route.snapshot.queryParams["page"]) {
      this.currentPage = Number(this.route.snapshot.queryParams["page"]);
    }
    this.loadStudents();
  }

  loadStudents() {
    this.studentsSvc
      .getStudents(
        this.searchText,
        this.confSvc.pageSize,
        (this.currentPage - 1) * this.confSvc.pageSize
      )
      .subscribe(students => {
        this.students = students;
      });

    this.studentsSvc.getStudentsCount(this.searchText).subscribe(countInfo => {
      this.pages = Math.round(countInfo.count / this.confSvc.pageSize);
      const range = (from, to, step) =>
        Array(Math.floor((to - from) / step) + 1)
          .fill(0)
          .map((v, i) => from + i * step);
      this.rangePages = range(1, this.pages, 1);
    });
  }

  saveStudent() {
    this.studentsSvc.registerStudent(this.newStudent).subscribe(student => {
      this.loadStudents();
    });
  }

  updateStudent() {
    this.studentsSvc.updateStudent(this.editStudent).subscribe(student => {
      this.loadStudents();
    });
  }

  removeStudent(id) {
    this.studentsSvc.removeStudent(id).subscribe(removed => {
      this.loadStudents();
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
    this.editStudent = toEdit;
    this.modalService.open(content).result.then(
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

  search() {
    this.loadStudents();
  }
}
