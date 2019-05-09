import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ComponentInteractionComponent } from './nav/component/component-interaction/component-interaction.component';
import { DirectivesComponent } from './nav/component/directives/directives.component';
import { LifecyclesComponent } from './nav/component/lifecycles/lifecycles.component';
import { PipesComponent } from './nav/component/pipes/pipes.component';
import { PageNotFoundComponent } from './nav/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'component-interaction', component: ComponentInteractionComponent },
  { path: 'directives', component: DirectivesComponent },
  { path: 'lifecycles', component: LifecyclesComponent },
  { path: 'pipes', component: PipesComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
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
