//# Global Pipes
//
//** These `pipes` are available in any template **

import {PLATFORM_PIPES} from '@angular/core';

//# APPLICATION_PIPES
//
//** Pipes that are global throughout our application **
export const APPLICATION_PIPES = [

];

export const PIPES = [
  {provide: PLATFORM_PIPES, multi: true, useValue: APPLICATION_PIPES }
];
