import { Component, OnInit } from '@angular/core';
import { ParentsService } from "../../../services/parents.service";
import { ActivatedRoute } from "@angular/router";
import { StudentsService } from "../../../services/students.service";
import { FollowUpsService } from "../../../services/follow-ups.service";
import { ConfigurationService } from "../../../services/configuration.service";
import { SocketService } from "../../../services/socket.service";
import { NotificationsService } from "angular2-notifications";
import { BellNotificationsService } from "../../../services/bell-notifications.service";

enum Event {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect'
}

@Component({
  selector: "app-son-home",
  templateUrl: "./son-home.component.html",
  styleUrls: ["./son-home.component.css"]
})
export class SonHomeComponent implements OnInit {
  studentId = "noId";
  student: any;
  assignedCourses: any;
  sons = [];
  searchText = "";
  pages = 0;
  currentPage = 1;
  rangePages = [];
  followUps = [];
  ioConnection: any;
  messages: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private parentsSvc: ParentsService,
    private studentsSvc: StudentsService,
    private followUpsSvc: FollowUpsService,
    private confSvc: ConfigurationService,
    private socketSvc: SocketService,
    private notificationsSvc: NotificationsService,
    private bellNotificationsSvc: BellNotificationsService
  ) {
    this.student = {};
  }

  ngOnInit() {
    this.initIoConnection();
    this.studentId = this.route.snapshot.paramMap.get("id");
    if (this.route.snapshot.queryParams["page"]) {
      this.currentPage = Number(this.route.snapshot.queryParams["page"]);
    }
    
    this.studentsSvc.getNotifications(this.studentId).subscribe(notifications => {
      notifications.forEach(notification => {
        this.bellNotificationsSvc
          .removeNotification(notification.id)
          .subscribe(res => console.log(res));
      });
      setTimeout(() => {
        this.socketSvc.followUpReadNotification("");
      }, 1500);
    });

    this.parentsSvc.getStudent(this.studentId).subscribe(students => {
      this.student = students[0];
      this.studentsSvc
        .getCourses(this.student.id)
        .subscribe(courseStudents => {
          this.studentsSvc
            .getCourseYears(courseStudents)
            .subscribe(courseYears => (this.assignedCourses = courseYears));
        });
    });

    this.loadFollowUps();
  }

  private initIoConnection(): void {
    this.socketSvc.initSocket();

    this.ioConnection = this.socketSvc
      .onMessage()
      .subscribe((message: any) => {
        this.messages.push(message);
      });
    this.socketSvc.onEvent(Event.CONNECT).subscribe(() => {
      console.log("connected");
    });

    this.socketSvc.onEvent("followUp").subscribe(data => {
      this.loadFollowUps();
    });

    this.socketSvc.onEvent(Event.DISCONNECT).subscribe(() => {
      console.log("disconnected");
    });
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
}
