import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AuthGuard }            from '@utils/auth/auth-guard.service';
import { AddArticleComponent } from './addarticle/addarticle';
import { ArticleComponent } from './article.component';
import { ArticleListComponent } from './articlelist/articlelist';
import { EditArticleComponent } from './editarticle/editarticle';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    component: ArticleComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ArticleListComponent },
      { path: 'add', component: AddArticleComponent },
      { path: 'edit/:id', component: EditArticleComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRouting {}
