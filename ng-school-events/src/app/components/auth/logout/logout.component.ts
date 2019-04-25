import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { RolesService } from "../../../services/roles.service";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.css"]
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router, public authSvc: AuthService, public rolesSvc: RolesService) {}

  ngOnInit() {
    this.authSvc.logout();
    this.rolesSvc.reloadUser();
    window.location.href = ""; // reload the entire page to reload services
  }
}
