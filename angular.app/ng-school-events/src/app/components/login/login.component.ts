import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { AuthService } from "../../services/auth.service";
import { UsersService } from "../../services/users.service";
import { RolesService } from "../../services/roles.service";
import { Router } from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginInfo: any;
  hasError = false;
  errorInfo = "Error to login";
  constructor(
    private router: Router,
    private location: Location,
    private authSvc: AuthService,
    private loginSvc: LoginService,
    private rolesSvc: RolesService,
    private usersSvc: UsersService
  ) {
    this.loginInfo = {};
  }

  ngOnInit() {}

  onLogin() {
    this.loginSvc.login(this.loginInfo).subscribe(
      userData => {
        this.hasError = false;
        this.authSvc.saveTokenInfo(userData);
        this.rolesSvc.reloadUser();
        this.usersSvc.getCurrentUser().subscribe(res => {
          this.authSvc.saveRoleInfo(res);
          if (res.userType == "teacher") {
            window.location.href = "/home"; // reload the entire page to reload services
          } else if (res.userType == "parent") {
            window.location.href = "/home"; // reload the entire page to reload services
          } else if (res.userType == "admin") {
            window.location.href = "/home"; // reload the entire page to reload services
          }
        });
      },
      error => {
        this.hasError = true;
      }
    );
  }
}
