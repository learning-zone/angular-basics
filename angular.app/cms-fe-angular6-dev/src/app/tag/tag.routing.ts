import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AuthGuard }            from '../../utils/auth/auth-guard.service';
import { AddTagComponent } from './addtag/addtag';
import { EditTagComponent } from './edittag/edittag';
import { TagComponent } from './tag.component';
import { TagListComponent } from './taglist/taglist';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    component: TagComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: TagListComponent },
      { path: 'add', component: AddTagComponent },
      { path: 'edit/:id', component: EditTagComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagRouting {}
