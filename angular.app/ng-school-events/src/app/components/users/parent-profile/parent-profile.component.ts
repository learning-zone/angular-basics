import { Component, OnInit } from '@angular/core';
import { UsersService } from "../../../services/users.service";
import { ParentsService } from "../../../services/parents.service";

@Component({
  selector: "app-parent-profile",
  templateUrl: "./parent-profile.component.html",
  styleUrls: ["./parent-profile.component.css"]
})
export class ParentProfileComponent implements OnInit {
  currentUser: any;
  parentInfo: any;
  type: any;
  constructor(
    private usersSvc: UsersService,
    private parentsSvc: ParentsService
  ) {
    this.currentUser = {};
    this.parentInfo = {};
    this.type = "parent";
  }

  ngOnInit() {
    this.parentsSvc
      .getParentByUserId(this.usersSvc.getCurrentUserId())
      .subscribe(parents => {
        if (parents.length == 0) {
          console.log("This is what i should work on");
          this.parentInfo = { userId: this.usersSvc.getCurrentUserId() };
        } else {
          this.parentInfo = parents[0];
        }
      });
  }
}
