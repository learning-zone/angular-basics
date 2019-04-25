import { Component, OnInit } from '@angular/core';
import { ParentsService } from "../../../services/parents.service";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-parent-register',
  templateUrl: './parent-register.component.html',
  styleUrls: ['./parent-register.component.css']
})
export class ParentRegisterComponent implements OnInit {

  parentInfo: any;
  constructor(private router: Router, private parentsSvc: ParentsService, private authSvc: AuthService) {
    this.parentInfo = { userType: "parent", password: "password" };
  }

  ngOnInit() {

  }

  onSave() {
    this.parentsSvc.registerParent(this.parentInfo).subscribe(res => {
      this.router.navigate(["/parent-list"]);
    });
  }

}
