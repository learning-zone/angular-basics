import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { StudentsService } from "../../../services/students.service";
import { Router } from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: "app-student-register",
  templateUrl: "./student-register.component.html",
  styleUrls: ["./student-register.component.css"]
})
export class StudentRegisterComponent implements OnInit {
  student: any;

  constructor(private router: Router, private studentsSvc: StudentsService, private location: Location) {
    this.student = {};
  }

  ngOnInit() {}

  onSave() {
    let studentInfo = this.student;
    this.studentsSvc
      .registerStudent(studentInfo)
      .subscribe(student => {
        this.location.back();
      });
  }
}
