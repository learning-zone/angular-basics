import { Component, OnInit } from '@angular/core';
import { TeachersService } from "../../../services/teachers.service";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-teacher-register",
  templateUrl: "./teacher-register.component.html",
  styleUrls: ["./teacher-register.component.css"]
})
export class TeacherRegisterComponent implements OnInit {
  teacher: any;

  constructor(
    private router: Router, 
    private teachersSvc: TeachersService,
    private authSvc: AuthService
  ) {
    this.teacher = { userType: "teacher", password: "password" };
  }

  ngOnInit() {}

  onSave() {
    this.teacher.user = {id: this.authSvc.getCurrentUserId()}
    let teacherInfo = this.teacher;
    this.teachersSvc.registerTeacher(teacherInfo).subscribe(res => {
      this.router.navigate(["/teacher-list"]);
    });
  }
}
