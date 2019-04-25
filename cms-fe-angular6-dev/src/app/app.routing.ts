import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AuthGuard } from '../utils/auth/auth-guard.service';
import { HomeComponent } from './home';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule?chunkName=dashboard' },
      { path: 'article', loadChildren: './article/article.module#ArticleModule?chunkName=article' },
      { path: 'articletype', loadChildren: './articletype/articletype.module#ArticleTypeModule?chunkName=articletype' },
      { path: 'tag', loadChildren: './tag/tag.module#TagModule?chunkName=tag' },
      { path: 'user', loadChildren: './user/user.module#UserModule?chunkName=user' },
      { path: 'comment', loadChildren: './comment/comment.module#CommentModule?chunkName=comment' },
      { path: 'charts', loadChildren: './charts/chart.module#ChartModule?chunkName=chart' },
      { path: 'systemlog', loadChildren: './systemlogs/systemlog.module#SystemLogModule?chunkName=systemlog' },
      { path: 'doubleball', loadChildren: './doubleball/doubleball.module#DoubleBallModule?chunkName=doubleball' },
      { path: 'demos', loadChildren: './demos/demos.module#DemosModule?chunkName=demos' },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRouting { }
