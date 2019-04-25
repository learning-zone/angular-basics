import { Injectable } from '@angular/core';
import { UsersService } from "./users.service";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class RolesService {
  userInfo: any = null;
  loaded = false;
  homeUrl = "/home";

  constructor(private usersSvc: UsersService, private authSvc: AuthService) {
    this.usersSvc.getCurrentUser().subscribe(res => {
      this.userInfo = res;
      this.loaded = true;
    });
  }

  isTeacher() {
    return this.authSvc.getUserType() == "teacher";
  }

  isParent() {
    return this.authSvc.getUserType() == "parent";
  }

  reloadUser() {
    this.userInfo = {};
    this.usersSvc.getCurrentUser().subscribe(res => {
      this.userInfo = res;
    });
  }

  isAdmin() {
    return this.authSvc.getUserType() == "admin";
  }

  getUserType() {
    return this.authSvc.getUserType();
  }

  getUserEmail() {
    if (this.userInfo) {
      return this.userInfo.email;
    }
    return "";
  }

  getUserId() {
    if (this.userInfo) {
      return this.userInfo.id;
    }
    return "";
  }

  getParentId() {
    if (this.userInfo.parents) {
      return this.userInfo.parents.id;
    }
    return "";
  }

  getParent() {
    if (this.userInfo.parents) {
      return this.userInfo.parents;
    }
    return {};
  }

  getTeacherId() {
    if (this.userInfo.teachers) {
      return this.userInfo.teachers.id;
    }
    return "";
  }

  getTeacherParentId() {
    if (this.getTeacherId()) return this.getTeacherId();
    else return this.getParentId();
  }

  getTeacher() {
    if (this.userInfo.teachers) {
      return this.userInfo.teachers;
    }
    return {};
  }

  getUserName() {
    if (this.userInfo) {
      if (this.userInfo.teachers) return this.userInfo.teachers.firstName;
      else if (this.userInfo.parents) return this.userInfo.parents.firstName;
    }
    return "";
  }
}
