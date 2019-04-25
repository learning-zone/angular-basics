import { Component, OnInit, Input } from '@angular/core';
import { TeachersService } from "../../../services/teachers.service";
import { StudentsService } from "../../../services/students.service";

@Component({
  selector: 'app-user-info-edit',
  templateUrl: './user-info-edit.component.html',
  styleUrls: ['./user-info-edit.component.css']
})
export class UserInfoEditComponent implements OnInit {
  @Input() userInfo: any;
  constructor(private teachersSvc: TeachersService, private studentsSvc: StudentsService) {
    this.userInfo = {}
  }

  ngOnInit() {
    
  }
}