import { Component, OnInit } from '@angular/core';
import { TeachersService } from "../../../services/teachers.service";
import { ConfigurationService } from "../../../services/configuration.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-teacher-list",
  templateUrl: "./teacher-list.component.html",
  styleUrls: ["./teacher-list.component.css"]
})
export class TeacherListComponent implements OnInit {
  teachers: any[];
  pages = 0;
  currentPage = 1;
  rangePages = [];
  constructor(
    private route: ActivatedRoute,
    private teachersSvc: TeachersService,
    private confSvc: ConfigurationService
  ) {
    this.teachers = [];
  }

  ngOnInit() {
    if (this.route.snapshot.queryParams["page"]) {
      this.currentPage = Number(this.route.snapshot.queryParams["page"]);
    }

    this.teachersSvc
      .getTeachers(
        this.confSvc.pageSize,
        (this.currentPage - 1) * this.confSvc.pageSize
      )
      .subscribe(teachers => {
        this.teachers = teachers;
      });

    this.teachersSvc.getTeachersCount().subscribe(countInfo => {
      this.pages = Math.round(countInfo.count / this.confSvc.pageSize);
      const range = (from, to, step) =>
        Array(Math.floor((to - from) / step) + 1)
          .fill(0)
          .map((v, i) => from + i * step);
      this.rangePages = range(1, this.pages, 1);
    });
  }
}
