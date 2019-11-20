import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ComponentInteractionComponent } from './nav/component/component-interaction/component-interaction.component';
import { DirectivesComponent } from './nav/component/directives/directives.component';
import { LifecyclesComponent } from './nav/component/lifecycles/lifecycles.component';
import { PipesComponent } from './nav/component/pipes/pipes.component';
import { PageNotFoundComponent } from './nav/page-not-found/page-not-found.component';
import { ReativeFormsComponent } from './nav/forms/reative-forms/reative-forms.component';
import { ObservablesComponent } from './nav/rxjs/observables/observables.component';
import { PromisesComponent } from './nav/rxjs/promises/promises.component';
import { DependencyInjectionComponent } from './nav/dependency-injection/dependency-injection/dependency-injection.component';
import { DiProvidersComponent } from './nav/dependency-injection/di-providers/di-providers.component';
import { RoutingComponent } from './nav/routing/routing/routing.component';
import { LazyLoadingComponent } from './nav/routing/lazy-loading/lazy-loading.component';
import { ServicesComponent } from './nav/routing/services/services.component';
import { ProvidersComponent } from './nav/routing/providers/providers.component';
import { AuthenticationComponent } from './nav/routing/authentication/authentication.component';
import { HttpclientComponent } from './nav/routing/httpclient/httpclient.component';
import { AnimationsComponent } from './nav/miscellaneous/animations/animations.component';
import { InternationalizationComponent } from './nav/miscellaneous/internationalization/internationalization.component';
import { DragDropComponent } from './nav/miscellaneous/drag-drop/drag-drop.component';
import { VirtualScrollingComponent } from './nav/miscellaneous/virtual-scrolling/virtual-scrolling.component';
import { TemplateDrivenComponent } from './nav/forms/template-driven/template-driven.component';
import { DashboardComponent } from './nav/routing/lazy-loading/dashboard/dashboard.component';
import { HomeComponent } from './nav/routing/lazy-loading/home/home.component';
import { RightsComponent } from './nav/routing/lazy-loading/rights/rights.component';
import { UsersComponent } from './nav/routing/lazy-loading/users/users.component';


const routes: Routes = [
  { path: '', redirectTo: '/component-interaction', pathMatch: 'full' },
  { path: 'component-interaction', component: ComponentInteractionComponent },
  { path: 'directives', component: DirectivesComponent },
  { path: 'lifecycles', component: LifecyclesComponent },
  { path: 'pipes', component: PipesComponent },

  { path: 'template-driven-forms', component: TemplateDrivenComponent },
  { path: 'reative-forms', component: ReativeFormsComponent },

  { path: 'observables', component: ObservablesComponent },
  { path: 'promises', component: PromisesComponent },
  { path: 'dependency-injection', component: DependencyInjectionComponent },
  { path: 'di-providers', component: DiProvidersComponent },

  { path: 'routing', component: RoutingComponent },
  { path: 'lazy-loading', component: LazyLoadingComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'rights', component: RightsComponent },
      { path: 'users', component: UsersComponent }
    ]
  },
  { path: 'services', component: ServicesComponent },
  { path: 'providers', component: ProvidersComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'httpclient', component: HttpclientComponent },

  { path: 'animations', component: AnimationsComponent },
  { path: 'internationalization', component: InternationalizationComponent },
  { path: 'drag-drop', component: DragDropComponent },
  { path: 'virtual-scrolling', component: VirtualScrollingComponent },
 
  { path: 'home', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
