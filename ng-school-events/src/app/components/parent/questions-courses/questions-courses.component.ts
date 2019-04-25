import { Component, OnInit } from '@angular/core';
import { ParentsService } from "../../../services/parents.service";
import { RolesService } from "../../../services/roles.service";

@Component({
  selector: "app-questions-courses",
  templateUrl: "./questions-courses.component.html",
  styleUrls: ["./questions-courses.component.css"]
})
export class QuestionsCoursesComponent implements OnInit {
  sons = [];
  constructor(private parentsSvc: ParentsService, private rolesSvc: RolesService ) {}

  ngOnInit() {
    setTimeout(() => {
    this.parentsSvc
      .getSons(this.rolesSvc.getParentId())
      .subscribe(
        sons =>
          (this.sons = sons.map(son => {
            return {
              id: son.id,
              routeLink: "./../../../parent/son/" + son.id,
              student: son.student
            };
          }))
      );
      }, 500);
  }
}
