import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-invite',
  templateUrl: './user-invite.component.html',
  styleUrls: ['./user-invite.component.css']
})
export class UserInviteComponent implements OnInit {
  @Input() inviteInfo: any;
  constructor() {
    this.inviteInfo = {};
   }

  ngOnInit() {
  }

}
