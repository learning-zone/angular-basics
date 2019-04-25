import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-invite-list',
  templateUrl: './user-invite-list.component.html',
  styleUrls: ['./user-invite-list.component.css']
})
export class UserInviteListComponent implements OnInit {

  @Input() users: any;
  constructor() {
    this.users = [];
  }

  ngOnInit() {
  }

}
