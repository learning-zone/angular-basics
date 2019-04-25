import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AuthGuard }            from '@utils/auth/auth-guard.service';
import { CommentComponent } from './comment.component';
import { CommentListComponent } from './commentlist/commentlist';
import { CommentDetailComponent } from './commentdetail/commentdetail';

const routes: Routes = [
    {
        path: '',
        canActivateChild: [AuthGuard],
        component: CommentComponent,
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: CommentListComponent },
            { path: 'detail/:id', component: CommentDetailComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CommentRouting {}
