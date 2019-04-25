import { Routes } from '@angular/router';

import * as components from '../components';

export const appRoutes: Routes = [
  {
    path: '',            component: components.HomePageComponent
  },
  { path: 'catalog',     component: components.CatalogPageComponent },
  { path: 'catalog/:id', component: components.CatalogItemPreviewComponent },
  { path: 'cart',        component: components.ShoppingCartComponent },
  {
    path: 'admin',
    component: components.AdminPageComponent,
    children: [
      { path: '',         component: components.AdminStoreComponent },
      { path: 'create',   component: components.AdminCreateComponent },
      { path: 'edit/:id', component: components.AdminEditComponent },
    ]},
  { path: '**',          component: components.PageNotFoundComponent }
];
