import { Component, OnInit, Input } from "@angular/core";
import { CoursesService } from "../../../services/courses.service";
import { ActivatedRoute } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-course-year',
  templateUrl: './course-year.component.html',
  styleUrls: ['./course-year.component.css']
})
export class CourseYearComponent implements OnInit {
  courseYears = [];
  courseId = "";
  course: any;
  confMessage = "";
  closeResult: string;
  constructor(private coursesSvc: CoursesService, private modalService: NgbModal,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get("courseId");
    
    this.coursesSvc.getCourse(this.courseId).subscribe(course => {
      this.course = course;
    });

    this.coursesSvc.getCourseYears(this.courseId).subscribe(courses => {
      this.courseYears = courses.map(year => {
        return { id: year.id, schoolYear: year['school-year']};
      });
    });
  }

}
