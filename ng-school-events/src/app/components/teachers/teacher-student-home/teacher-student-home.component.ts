import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FollowUpsService } from "../../../services/follow-ups.service";
import { ConfigurationService } from "../../../services/configuration.service";
import { RolesService } from "../../../services/roles.service";
import { SocketService } from "../../../services/socket.service";
import { StudentsService } from "../../../services/students.service";
import { BellNotificationsService } from "../../../services/bell-notifications.service";

@Component({
  selector: "app-teacher-student-home",
  templateUrl: "./teacher-student-home.component.html",
  styleUrls: ["./teacher-student-home.component.css"]
})
export class TeacherStudentHomeComponent implements OnInit {
  student: any;
  followUps: any;
  studentId: any;
  courseId: any;
  newFollowUp: any;
  editFollowUp: any;
  searchText = "";
  closeResult: string;

  pages = 0;
  currentPage = 1;
  rangePages = [];

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private followUpsSvc: FollowUpsService,
    private confSvc: ConfigurationService,
    public rolesSvc: RolesService,
    private socketSvc: SocketService,
    private bellNotificationsSvc: BellNotificationsService,
    private studentsSvc: StudentsService
  ) {
    this.newFollowUp = {};
    this.editFollowUp = {};
    this.followUps = [];
    this.student = {};
  }

  sendFollowUpNofication(message: string) {
    if (!message) {
      return;
    }
    this.socketSvc.followUpNotification({
      from: this.rolesSvc.getUserName(),
      content: message,
      studentId: this.studentId,
      courseId: this.courseId
    });
  }

  sendFollowUpReadNofication(message: string) {
    this.socketSvc.followUpReadNotification({
      from: this.rolesSvc.getUserName(),
      content: message
    });
  }

  ngOnInit() {
    this.studentId = this.route.snapshot.paramMap.get("studentId");
    this.studentsSvc.getStudent(this.studentId).subscribe(student => {
      this.student = student;
    });

    this.courseId = this.route.snapshot.paramMap.get("courseId");
    if (this.route.snapshot.queryParams["page"]) {
      this.currentPage = Number(this.route.snapshot.queryParams["page"]);
    }
    this.loadFollowUps();
  }

  loadFollowUps() {
    this.followUpsSvc
      .getFollowUps(
        this.studentId,
        this.searchText,
        this.confSvc.pageSize,
        (this.currentPage - 1) * this.confSvc.pageSize
      )
      .subscribe(followUps => (this.followUps = followUps));

    this.followUpsSvc
      .getFollowUpsCount(this.studentId, this.searchText)
      .subscribe(countInfo => {
        this.pages = Math.round(countInfo.count / this.confSvc.pageSize);
        const range = (from, to, step) =>
          Array(Math.floor((to - from) / step) + 1)
            .fill(0)
            .map((v, i) => from + i * step);
        this.rangePages = range(1, this.pages, 1);
      });
  }

  saveFollowUp() {
    this.sendFollowUpNofication("An Follow up was created");
    this.sendFollowUpReadNofication("");

    this.newFollowUp.registeredDate = new Date();
    this.newFollowUp.studentId = this.studentId;

    this.followUpsSvc.registerFollowUp(this.newFollowUp).subscribe(follow => {
      this.bellNotificationsSvc.registerNotification({ studentId: this.studentId }).subscribe(res => {});
      this.loadFollowUps();
      this.newFollowUp = {};
    });
  }

  updateFollowUp() {
    this.sendFollowUpNofication("An Follow up was Updated");
    this.followUpsSvc.updateFollowUp(this.editFollowUp).subscribe(follow => {
      this.loadFollowUps();
    });
  }

  removeFollowUp(id) {
    this.sendFollowUpNofication("An Follow up was removed");
    this.followUpsSvc.removeFollowUp(id).subscribe(result => {
      this.loadFollowUps();
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

  openEdit(toEdit, content) {
    this.editFollowUp = toEdit;
    this.modalService.open(content, { size: 'lg' }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
}
