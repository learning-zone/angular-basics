import { Component, OnInit } from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {RolesService} from '../../../services/roles.service';
import {AuthService} from '../../../services/auth.service';
import {ParentsService} from '../../../services/parents.service';
import { SocketService } from "../../../services/socket.service";

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
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
  providers: [NgbDropdownConfig]
})
export class HeaderComponent implements OnInit {
  sons: any;
  sonNotifications: any;
  ioConnection: any;
  constructor(
    config: NgbDropdownConfig,
    public authSvc: AuthService,
    public rolesSvc: RolesService,
    public parentsSvc: ParentsService,
    private socketSvc: SocketService,
  ) {}

  ngOnInit() {
    this.initIoConnection();

    setTimeout(() => {
      this.loadInfo();
    }, 1000);
  }

  private loadInfo() {
    if (this.rolesSvc.getUserType() == "parent") {
      this.parentsSvc.getSons(this.rolesSvc.getParentId()).subscribe(sons => {
          if (sons.length > 0) {
            this.parentsSvc.getSonsNotifications(sons).subscribe(result => {
              this.sonNotifications = result.filter(
                noti => noti.notifications.length > 0
              );
            });
          }
      }
      );
    }
  }

  private initIoConnection() {
    this.socketSvc.initSocket();

    this.ioConnection = this.socketSvc.onMessage().subscribe((message: any) => {

    });

    this.socketSvc.onEvent("followUpRead").subscribe(data => {
      this.loadInfo();
      console.log("Notifications load");
    });

    this.socketSvc.onEvent("followUp").subscribe(data => {
      //console.log(data);
      this.loadInfo();
    });
  }
}
