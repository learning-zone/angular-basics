//Nawal
//# Providers provided by Angular
import {bootstrap} from '@angular/platform-browser-dynamic';

//## Platform and Environment
//
//** our providers/directives/pipes **
import {DIRECTIVES, PIPES, PROVIDERS} from './platform/browser';
import {ENV_PROVIDERS} from './platform/environment';

//## App Component
//
//** our top level component that holds all of our components **
import {App, APP_PROVIDERS, APP_STORES} from './app';

// Bootstrap our Angular app with a top level component `App` and inject
// our Services and Providers into Angular's dependency injection
import {SharedService} from './app/services/shared.service';
import {UserService} from './app/auth/user.service';
import {NG2_UI_AUTH_PROVIDERS} from 'ng2-ui-auth';
import {ANGULAR2_GOOGLE_MAPS_PROVIDERS, NoOpMapsAPILoader,LazyMapsAPILoaderConfig} from 'angular2-google-maps/core';


const DEFAULT_POST_HEADER: {[name: string]: string} = {
  'Content-Type': 'application/json'
};
const GOOGLE_CLIENT_ID = '******************************.apps.googleusercontent.com';
import {provide} from '@angular/core';

export function main(initialHmrState?: any): Promise<any> {

//alert('dddee');

  return bootstrap(App, [
		
    ...PROVIDERS,
    ...ENV_PROVIDERS,
    ...DIRECTIVES,
    ...PIPES,
    ...APP_PROVIDERS,
    ...APP_STORES,
      SharedService,
      UserService,
	  NG2_UI_AUTH_PROVIDERS({defaultHeaders: DEFAULT_POST_HEADER, providers: {google: {clientId: GOOGLE_CLIENT_ID}}}),
      provide(LazyMapsAPILoaderConfig, {
          useFactory: () => {
              let config = new LazyMapsAPILoaderConfig();
              config.libraries = ['places'];
              return config;
          }
      })


  ])
  .catch(err => console.error(err));
}

//## Vendors
//
// For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
// You can also import them in vendors to ensure that they are bundled in one file
// Also see custom-typings.d.ts as you also need to do `typings install x` where `x` is your module

//## Hot Module Reload
//
// experimental version

if ('development' === ENV && HMR === true) {

  // activate hot module reload
  let ngHmr = require('angular2-hmr');
  ngHmr.hotModuleReplacement(main, module);
} else {

  // bootstrap when documetn is ready
  document.addEventListener('DOMContentLoaded', () => main());
}
