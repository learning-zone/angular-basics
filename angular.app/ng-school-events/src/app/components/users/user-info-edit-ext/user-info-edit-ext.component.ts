import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-info-edit-ext',
  templateUrl: './user-info-edit-ext.component.html',
  styleUrls: ['./user-info-edit-ext.component.css']
})
export class UserInfoEditExtComponent implements OnInit {

  @Input() userInfo: any;
  constructor() {
    this.userInfo = {};
  }

  ngOnInit() {
  }

}
