import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(private router: Router) {

  }

  private accessTokenLabel = "access_token";

  private roleLabel = "role";

  private userIdLabel = "user_id";

  public isAuthenticated(): boolean {
    if (localStorage.getItem(this.accessTokenLabel)) {
      return localStorage.getItem(this.accessTokenLabel).length > 10;
    }
    return false;
  }

  public saveSessionInfo(user) {
    console.log(user);
    localStorage.setItem(this.accessTokenLabel, user.id);
    localStorage.setItem(this.userIdLabel, user.userId);
  }

  public saveTokenInfo(tokenInfo) {
    localStorage.setItem(this.accessTokenLabel, tokenInfo.id);
    localStorage.setItem(this.userIdLabel, tokenInfo.userId);
  }

  public saveRoleInfo(userInfo) {
    localStorage.setItem(this.roleLabel, userInfo.userType);
  }

  public getUserType() {
    return localStorage.getItem(this.roleLabel);
  }

  public logout() {
    localStorage.removeItem(this.accessTokenLabel);
    localStorage.removeItem(this.userIdLabel);
    localStorage.removeItem(this.roleLabel);
  }

  public getCurrentUserId(): string {
    return localStorage.getItem(this.userIdLabel);
  }
  
  public getAccessToken(): string {
    if (localStorage.getItem(this.accessTokenLabel)) {
      return localStorage.getItem(this.accessTokenLabel);
    }
    return "";
  }


}
