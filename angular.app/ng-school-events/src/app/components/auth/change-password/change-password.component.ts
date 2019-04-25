import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from "../../../services/login.service";
import { UsersService } from "../../../services/users.service";
import { AuthService } from "../../../services/auth.service";
import { RolesService } from "../../../services/roles.service";
import { Validator, NG_VALIDATORS } from '@angular/forms';

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"]
})
export class ChangePasswordComponent implements OnInit {
  newPassword = "";
  oldPassword = "";
  newPasswordRepeat = "";
  hasError = false;
  passwordNotMatch = false;
  errorInfo = "Error to login";
  constructor(
    private route: ActivatedRoute,
    private loginSvc: LoginService,
    private usersSvc: UsersService,
    private authSvc: AuthService,
    private rolesSvc: RolesService
  ) {
    this.newPassword = "";
    this.oldPassword = "";
    this.newPasswordRepeat = "";
  }

  ngOnInit() {
  }

  passwordMatch() {
    if (this.newPassword == "" && this.newPasswordRepeat == "") {
      this.passwordNotMatch = true;
    } else {
      this.passwordNotMatch = (this.newPassword != this.newPasswordRepeat);
    }
  }

  changePassword() {
    let changPassword = {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    };
    if (this.passwordNotMatch) {
      return;
    }

    this.usersSvc.changePassword(changPassword).subscribe(passChanged => {
      this.hasError = false;
      let userLogin = {
        email: this.rolesSvc.getUserEmail(),
        password: this.newPassword
      };
      this.loginSvc.login(userLogin).subscribe(loginInfo => {
        this.authSvc.saveSessionInfo(loginInfo);
        this.rolesSvc.reloadUser();
        window.location.href = ""; // reload the entire page to reload services
      });
    },
    error => {
      this.hasError = true;
    });
  }
}
