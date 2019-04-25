import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-login-info',
  templateUrl: './login-info.component.html',
  styleUrls: ['./login-info.component.css']
})
export class LoginInfoComponent implements OnInit {

  @Input() loginInfo: any;
  constructor() {
  }

  ngOnInit() {
  }

}
