import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ItemsComponent } from './items/items.component';
// import { Item } from './item';
// import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemDetailsComponent } from './item-details/item-details.component';

// an Angular route has two properties, path and component
const routes: Routes = [
  { path: 'items', component: ItemsComponent },
  // path to the dashboard
  { path: 'dashboard', component: DashboardComponent },
  // parameterized route
  { path: 'details/:id', component: ItemDetailsComponent },
  // this is the default route
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  exports: [ RouterModule ],
  // we configure the router at the app's root level
  imports: [RouterModule.forRoot(routes)]
})

export class AppRoutingModule {}
