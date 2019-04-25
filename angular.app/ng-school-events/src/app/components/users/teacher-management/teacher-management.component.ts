import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TeachersService } from "../../../services/teachers.service";

@Component({
    selector: 'app-teacher-management',
    templateUrl: './teacher-management.component.html',
    styleUrls: ['./teacher-management.component.css']
})
export class TeacherManagementComponent implements OnInit {

    closeResult: string;
    teachers: any[];
    teacherInfo: any;
    constructor(private modalService: NgbModal,
        private teachersSvc: TeachersService) {
        this.teachers = [];
        this.teacherInfo = { userType: "teacher", password: "password", email: "" };
    }

    ngOnInit() {
        this.loadTeachers();
    }

    loadTeachers() {
        this.teachersSvc.getTeachers().subscribe(teachers => {
            this.teachers = teachers;
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

    inviteTeacher() {
        let teacherInfo = this.teacherInfo;
        this.teachersSvc.registerTeacher(teacherInfo).subscribe(res => {
            this.teacherInfo = { userType: "teacher", password: "password" };
            this.loadTeachers();
        });
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
