import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AuthGuard } from '../../utils/auth/auth-guard.service';
import { Dashboard } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: Dashboard,
    canActivate: [AuthGuard],
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRouting {}
