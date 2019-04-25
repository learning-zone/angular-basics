import { Component, OnInit} from '@angular/core';
import { setTheme } from "ngx-bootstrap/utils";
import { AuthService } from "./services/auth.service";
import { RolesService } from "./services/roles.service";
import { ParentsService } from "./services/parents.service";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { ActivatedRoute, NavigationEnd } from "@angular/router";
import { SocketService } from "./services/socket.service";
import { NotificationsService } from "angular2-notifications";
import { FollowUpsService } from "./services/follow-ups.service";
import { ConfigurationService } from "./services/configuration.service";
import { CalendarManagementService } from "./components/common/calendar-management.service";

enum Action {
  JOINED,
  LEFT,
  RENAME
}

enum Event {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect'
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app";
  parentToggle = "";
  teacherToggle = "";
  userType = "";
  userName = "";
  breadcrumbs: any;
  sons = [];

  action = Action;
  user: any;
  messages: any[] = [];
  messageContent: string;
  ioConnection: any;
  dataContentEvents = ``;
  countFollowUps = 0;
  annCount = 0;

  constructor(
    public authSvc: AuthService,
    public rolesSvc: RolesService,
    public parentsSvc: ParentsService,
    private location: Location,
    private router: ActivatedRoute,
    private socketSvc: SocketService,
    private _notificationSvc: NotificationsService,
    private followUpsSvc: FollowUpsService,
    private confSvc: ConfigurationService,
    private cmService: CalendarManagementService
  ) {
    setTheme("bs4");
    this.userType = this.rolesSvc.getUserType();
    this.userName = this.rolesSvc.getUserName();

    setTimeout(() => {
      if (rolesSvc.isParent()) {
        parentsSvc
          .getSons(rolesSvc.getParentId())
          .subscribe(
            sons =>
              (this.sons = sons.map(son => {
                return {
                  id: son.id,
                  routeLink: "parent/son/" + son.id,
                  student: son.student
                };
              }))
          );
      }
    }, 500);
  }

  ngOnInit(): void {
    this.initIoConnection();
    this.loadFollowUps();
    this.loadAnnoucement();
  }

  loadFollowUps(): void {
    this.countFollowUps = 0;
    this.cmService.getAnnsAll().subscribe(anns => {
      this.dataContentEvents += `<ul class="list-group" style="width: 360px;">`;
      this.dataContentEvents += `<li class="list-group-item list-group-item-dark">NUEVO ANUNCIO</li>`;
      for (let i = 0; i < anns.length ; i++) {
        this.dataContentEvents += `<li class="list-group-item list-group-item-light"> Fecha de Inicio ${(new Date(anns[i].startDate)).toDateString()}: ${anns[i].title}</li>`;
      }
      this.dataContentEvents += `</ul>`;

      if (this.rolesSvc.isParent()) {
        this.followUpsSvc.getFollowUpsAll().subscribe(followUps => {
          this.dataContentEvents += `<ul class="list-group" style="width: 360px;">`;
          this.dataContentEvents += `<li class="list-group-item list-group-item-dark">SEGUIMIENTO</li>`;
          for (let i = 0; i < followUps.length ; i++) {
            this.dataContentEvents += `<li class="list-group-item list-group-item-light" >Nuevo Antecedente de Seguimiento para: ${followUps[i].student.firstName} <a class="pull-right" href="children/${followUps[i].student.id}">Ver</a></li>`;
          }
          this.dataContentEvents += `</ul>`;
        });
      }
    });

    this.followUpsSvc.getFollowUpsCountAll().subscribe(countInfo => {
      this.countFollowUps += countInfo.count;
    });

    this.cmService.getAnnsCountAll().subscribe(countInfo => {
      this.countFollowUps += countInfo.count;
    });
  }

  loadAnnoucement(): void {
    this.cmService.getAnnsCountAll().subscribe(countInfo => {
      this.annCount = countInfo.count;
    });
  }

  reloadUrl(sonUrl) {
    location.href = "" + sonUrl;
  }

  private initIoConnection(): void {
    this.socketSvc.initSocket();

    this.ioConnection = this.socketSvc .onMessage() .subscribe((message: any) => { this.messages.push(message); });
    this.socketSvc.onEvent(Event.CONNECT).subscribe(() => {
      console.log("connected");
    });

    this.socketSvc.onEvent("message").subscribe(data => {});

    this.socketSvc.onEvent("followUp").subscribe(data2 => {
      console.log(data2);
      this.parentsSvc.getStudentByParentId(this.rolesSvc.getParentId(), data2.studentId).subscribe(data => {
        if (data.length > 0) {
          this.loadFollowUps();
          var temp = { animate: "fromRight", clickToClose: true, pauseOnHover: true, showProgressBar: true, timeOut: 3000 };
          this._notificationSvc.create( "Nuevo Antecedente", "Un nuevo antecedente fue registrado", "success", temp );
        }
      });
    });

    this.socketSvc.onEvent("anns").subscribe(data => {
      this.loadAnnoucement();

      var temp = {
        animate: "fromRight",
        clickToClose: true,
        pauseOnHover: true,
        showProgressBar: true,
        timeOut: 3000
      };
      this._notificationSvc.create(
        "Nuevo Anuncio",
        "Un nuevo Anuncio fue registrado",
        "success",
        temp
      );
    });

    this.socketSvc.onEvent(Event.DISCONNECT).subscribe(() => {
      console.log("disconnected");
    });
  }

  sendMessageVoid() {
    //this.sendMessage("Some is viewing notifications");
  }

  public sendMessage(message: string) {
    if (!message) {
      return;
    }

    this.socketSvc.followUpNotification({
      from: this.rolesSvc.getUserName(),
      content: message
    });
    this.messageContent = null;
  }
}
