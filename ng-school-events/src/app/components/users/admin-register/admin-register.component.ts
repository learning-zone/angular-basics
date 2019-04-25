import { Component, OnInit } from '@angular/core';
import { UsersService } from "../../../services/users.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {
  admin: any;
  constructor(private router: Router, private usersSvc: UsersService) { 
    this.admin = { userType: "admin"};
  }

  ngOnInit() {
    
  }

  onSave() {
    let adminInfo = this.admin;
    this.usersSvc.registerAdmin(adminInfo).subscribe(res => {
      console.log(res);
      this.router.navigate(["/login"]);
    });
  }

}
