import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserSingleComponent } from './user-single/user-single.component';
import { UserService } from './user.service';

@NgModule({
  declarations: [UserListComponent, UserSingleComponent],
  imports: [CommonModule, UsersRoutingModule],
  providers: [UserService]
})
export class UsersModule {}
