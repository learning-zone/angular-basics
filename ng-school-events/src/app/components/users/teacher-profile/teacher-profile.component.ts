import { Component, OnInit } from "@angular/core";
import { UsersService } from "../../../services/users.service";
import { TeachersService } from "../../../services/teachers.service";

@Component({
  selector: "app-teacher-profile",
  templateUrl: "./teacher-profile.component.html",
  styleUrls: ["./teacher-profile.component.css"]
})
export class TeacherProfileComponent implements OnInit {
  currentUser: any;
  teacherInfo: any;
  type: any;
  constructor(
    private usersSvc: UsersService,
    private teachersSvc: TeachersService
  ) {
    this.currentUser = {};
    this.teacherInfo = {};
    this.type = "teacher";
  }

  ngOnInit() {
    this.teachersSvc
      .getTeacherByUserId(this.usersSvc.getCurrentUserId())
      .subscribe(teachers => {
        if (teachers.length == 0) {
          this.teacherInfo = { userId: this.usersSvc.getCurrentUserId() };
        } else {
          this.teacherInfo = teachers[0];
        }
      });
  }
}
