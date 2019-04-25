import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RolesService } from "../services/roles.service";
import { Router } from "@angular/router";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private rolesSvc: RolesService,
    private myRoute: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.rolesSvc.isAdmin()) {
      return true;
    } else {
      this.myRoute.navigate(["home"]);
      return false;
    }
  }
}
