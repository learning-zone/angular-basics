import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  template: `
    <div class="card" *ngFor="let user of users | async">
      {{ user.login }}
    </div>
  `
})
export class UserListComponent implements OnInit {
  users: any;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users = this.userService.getUsers();
  }
}
