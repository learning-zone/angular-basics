import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'ng2-material/all.webpack';
import {MATERIAL_PROVIDERS, MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {MeteorComponent} from 'angular2-meteor';

import { Component, provide } from '@angular/core';
import { bootstrap } from 'angular2-meteor-auto-bootstrap';
import { ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig } from '@angular/router-deprecated';
import { APP_BASE_HREF } from '@angular/common';
import { PartiesList } from './imports/parties-list/parties-list.ts';
import { PartyDetails } from './imports/party-details/party-details.ts';
import '../collections/methods.ts';
import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
import {LoginButtons} from 'angular2-meteor-accounts-ui';
import {RouterLink} from 'angular2/router';
import {DisplayName} from './imports/pipes/pipes.ts';
import {InjectUser} from 'angular2-meteor-accounts-ui';
import {Signup} from './imports/auth/signup.ts';
import {Recover} from './imports/auth/recover.ts';
import {BrowserLogin, APP_COMPONENT_BROWSER_TEMPLATE} from 'meteor/socially-browser';
import {MobileLogin, MOBILE_IMPORTS, APP_COMPONENT_MOBILE_TEMPLATE} from 'meteor/socially-mobile';

@Component({
  selector: 'app',
  templateUrl: APP_COMPONENT_BROWSER_TEMPLATE || APP_COMPONENT_MOBILE_TEMPLATE,
  directives: [ROUTER_DIRECTIVES, LoginButtons, MATERIAL_DIRECTIVES, RouterLink],
  pipes: [DisplayName]
})
@RouteConfig([
  { path: '/', as: 'PartiesList', component: PartiesList },
  { path: '/party/:partyId', as: 'PartyDetails', component: PartyDetails },
  { path: '/login', as: 'Login', component: BrowserLogin || MobileLogin},
  { path: '/signup', as: 'Signup', component: Signup },
  { path: '/recover', as: 'Recover', component: Recover }
])
@InjectUser()
class Socially extends MeteorComponent {
  user: Meteor.User;

  constructor() {
    super();
  }

  logout() {
    this.autorun(() => {
      Meteor.logout();
    });
  }
}

bootstrap(Socially, [MATERIAL_PROVIDERS, ROUTER_PROVIDERS, ANGULAR2_GOOGLE_MAPS_PROVIDERS, provide(APP_BASE_HREF, { useValue: '/' }), MOBILE_IMPORTS || []]);
