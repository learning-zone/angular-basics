import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-course-add-admin',
  templateUrl: './course-add-admin.component.html',
  styleUrls: ['./course-add-admin.component.css']
})
export class CourseAddAdminComponent implements OnInit {

  @Input() courseInfo;
  constructor() {
    this.courseInfo = {};
  }

  ngOnInit() {
  }

}
