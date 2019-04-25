import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { SchoolYearsService } from "../../../services/school-years.service";
import { ConfigurationService } from "../../../services/configuration.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-year-list-admin",
  templateUrl: "./year-list-admin.component.html",
  styleUrls: ["./year-list-admin.component.css"]
})
export class YearListAdminComponent implements OnInit {
  closeResult: string;
  newSchoolYear: any;
  editSchoolYear: any;
  schoolYearList: any;
  searchText = "";
  // pagination attributes
  pages = 0;
  currentPage = 1;
  rangePages = [];

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private schoolYearsSvc: SchoolYearsService,
    private confSvc: ConfigurationService
  ) {
    this.newSchoolYear = {};
    this.editSchoolYear = {};
    this.schoolYearList = [];
  }

  ngOnInit() {
    if (this.route.snapshot.queryParams["page"]) {
      this.currentPage = Number(this.route.snapshot.queryParams["page"]);
    }

    this.loadSchoolYears();
  }

  loadSchoolYears() {
    this.schoolYearsSvc
      .getSchoolYears(
        this.searchText,
        this.confSvc.pageSize,
        (this.currentPage - 1) * this.confSvc.pageSize
      )
      .subscribe(courses => (this.schoolYearList = courses));

    this.schoolYearsSvc
      .getSchoolYearsCount(this.searchText)
      .subscribe(countInfo => {
        this.pages = Math.round(countInfo.count / this.confSvc.pageSize);
        const range = (from, to, step) =>
          Array(Math.floor((to - from) / step) + 1)
            .fill(0)
            .map((v, i) => from + i * step);
        this.rangePages = range(1, this.pages, 1);
      });
  }

  saveSchoolYear() {
    let newSchoolYear = this.newSchoolYear;
    this.schoolYearsSvc.registerSchoolYear(newSchoolYear).subscribe(course => {
      this.loadSchoolYears();
      this.newSchoolYear = {};
    });
  }

  updateSchoolYear() {
    this.schoolYearsSvc.updateSchoolYear(this.editSchoolYear).subscribe(updated => {
      this.loadSchoolYears();
      this.editSchoolYear = {};
    });
  }

  removeYear(id: any) {
    this.schoolYearsSvc.removeSchoolYear(id).subscribe(removed => {
      this.loadSchoolYears();
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
    this.editSchoolYear = toEdit;
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
    this.loadSchoolYears();
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
