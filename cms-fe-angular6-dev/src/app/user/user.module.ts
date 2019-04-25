import { CommonModule }  from '@angular/common';
import { NgModule }      from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AddUserComponent } from './adduser/adduser';
import { AddUserService }  from './adduser/adduser.service';
import { EditUserComponent } from './edituser/edituser';
import { EditUserService }  from './edituser/edituser.service';
import { UserComponent } from './user.component';
import { UserRouting }       from './user.routing';
import { UserListComponent } from './userlist/userlist';
import { UserListService } from './userlist/userlist.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    UserRouting,
    NgZorroAntdModule.forRoot(),
  ],
  declarations: [
    UserComponent,
    UserListComponent,
    AddUserComponent,
    EditUserComponent,
  ],
  providers: [
    UserListService,
    AddUserService,
    EditUserService,
  ],
})
export class UserModule {}
