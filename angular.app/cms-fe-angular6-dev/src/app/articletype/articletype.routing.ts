import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AuthGuard } from '@utils/auth/auth-guard.service';
import { AddArticleTypeComponent } from './addarticletype/addarticletype';
import { ArticleTypeComponent } from './articletype.component';
import { ArticleTypeListComponent } from './articletypelist/articletypelist';
import { EditArticleTypeComponent } from './editarticletype/editarticletype';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    component: ArticleTypeComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ArticleTypeListComponent },
      { path: 'add', component: AddArticleTypeComponent },
      { path: 'edit/:id', component: EditArticleTypeComponent },
    ],
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ArticleTypeRouting {}
