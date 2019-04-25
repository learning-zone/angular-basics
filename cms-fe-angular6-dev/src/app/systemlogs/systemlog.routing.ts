import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AuthGuard }            from '../../utils/auth/auth-guard.service';
import { SystemLogComponent } from './systemlog.component';
import { SystemLogListComponent } from './systemloglist/systemloglist';
import { SystemLogDetailComponent } from './systemlogdetail/systemlogdetail';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    component: SystemLogComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: SystemLogListComponent },
      { path: 'detail/:id', component: SystemLogDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemLogRouting {}
