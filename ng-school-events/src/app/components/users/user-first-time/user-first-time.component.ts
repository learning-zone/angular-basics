import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from "../../../services/login.service";
import { UsersService } from "../../../services/users.service";
import { AuthService } from "../../../services/auth.service";
import { RolesService } from "../../../services/roles.service";

@Component({
  selector: "app-user-first-time",
  templateUrl: "./user-first-time.component.html",
  styleUrls: ["./user-first-time.component.css"]
})
export class UserFirstTimeComponent implements OnInit {
  email: string;
  userToken: string;
  newPassword: string;
  constructor(
    private route: ActivatedRoute,
    private loginSvc: LoginService,
    private usersSvc: UsersService,
    private authSvc: AuthService,
    private rolesSvc: RolesService
  ) {}

  ngOnInit() {
    this.email = this.route.snapshot.paramMap.get("email");
    let userLogin = { email: this.email, password: "password" };
    this.loginSvc
      .login(userLogin)
      .subscribe(loginInfo => {
        this.userToken = loginInfo.id;
      });
  }

  changePassword() {
    let changPassword = { oldPassword: "password", newPassword: this.newPassword };
    this.usersSvc.changePasswordFirstTime(changPassword, this.userToken).subscribe(passChanged => {
      let userLogin = { email: this.email, password: this.newPassword };
      this.loginSvc
        .login(userLogin)
        .subscribe(loginInfo => {
          this.userToken = loginInfo.Id;
          this.authSvc.saveSessionInfo(loginInfo);
          this.rolesSvc.reloadUser();
          window.location.href = ""; // reload the entire page to reload services
        });
    });
  }
}
