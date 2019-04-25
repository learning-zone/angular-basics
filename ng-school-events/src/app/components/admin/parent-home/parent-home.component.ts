import { Component, OnInit, Input } from "@angular/core";
import { ParentsService } from "../../../services/parents.service";
import { StudentsService } from "../../../services/students.service";
import { ActivatedRoute } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-parent-home",
  templateUrl: "./parent-home.component.html",
  styleUrls: ["./parent-home.component.css"]
})
export class ParentHomeComponent implements OnInit {
  assignedStudents = [];
  availableStudents = [];
  parentId = "";
  parent: any;
  confMessage = "";
  closeResult: string;

  constructor(
    private parentsSvc: ParentsService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private studentsSvc: StudentsService
  ) {
    this.parent = {};
  }

  ngOnInit() {
    this.parentId = this.route.snapshot.paramMap.get("id");
    this.parentsSvc.getParent(this.parentId).subscribe(parent => {
      this.parent = parent;
    });
    this.loadStudents();
  }

  loadStudents() {
    this.assignedStudents = [];
    this.parentsSvc.getStudents(this.parentId).subscribe(students => {
      this.assignedStudents = students;
      this.availableStudents = [];
      this.studentsSvc.getStudents('', 1000).subscribe(aStudents => {
        aStudents.forEach(student => {
          if (!this.assignedStudents.some(s => (s.student && (s.student.id == student.id)))) {
            this.availableStudents.push(student);
          }
        });
      });
    });
  }

  addStudent(student) {
    let studentParent = {
      "studentId": student.id,
      parentId: this.parentId
    };
    this.studentsSvc
      .saveParentStudentRel(studentParent)
      .subscribe(updatedStudent => {
        this.loadStudents();
      });
  }

  removeStudent(relId) {
    this.studentsSvc.removeParentStudentRel(relId).subscribe(res => {
      this.confMessage = "Student Removed";
      this.loadStudents();
    });
  }

  open(content) {
    this.modalService.open(content, { size: 'lg' }).result.then(
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

}
