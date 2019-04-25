//# Global Directives
//
//** These `directives` are available in any template **

import {PLATFORM_DIRECTIVES} from '@angular/core';

// Angular 2 Router
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

// Angular 2 Material 2
//
// TODO(datatypevoid): replace with @angular2-material/all
import {MATERIAL_DIRECTIVES} from './angular2-material2';

// APPLICATION_DIRECTIVES
//
// directives that are global through out the application
export const APPLICATION_DIRECTIVES = [

  ...ROUTER_DIRECTIVES,
  ...MATERIAL_DIRECTIVES
];

export const DIRECTIVES = [

  {provide: PLATFORM_DIRECTIVES, multi: true, useValue: APPLICATION_DIRECTIVES}
];
