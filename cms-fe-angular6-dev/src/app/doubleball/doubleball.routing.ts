import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AuthGuard }            from '@utils/auth/auth-guard.service';
import { DoubleBallComponent } from './doubleball.component';
import { DoubleBallListComponent } from './doubleballlist/doubleballlist';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    component: DoubleBallComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: DoubleBallListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoubleBallRouting {}
