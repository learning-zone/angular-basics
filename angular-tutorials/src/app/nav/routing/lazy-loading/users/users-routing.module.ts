import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserSingleComponent } from './user-single/user-single.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  {
    path: ':username',
    component: UserSingleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
