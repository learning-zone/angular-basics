import {Component, ViewEncapsulation} from '@angular/core';
import {RouteConfig, Router} from '@angular/router-deprecated';



import { OnInit, OnDestroy, Input, ViewChild, AfterViewInit} from '@angular/core';
import {Response, Http} from '@angular/http';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';
//import {Router} from '@angular/router';
import {MD_SIDENAV_DIRECTIVES, MdSidenav} from '@angular2-material/sidenav';
import {MdToolbar} from '@angular2-material/toolbar';
import {MATERIAL_DIRECTIVES, Media} from 'ng2-material';
import {MdIcon} from 'ng2-material';

import {AppState} from './app.service';

import {RouterActive} from './shared/directives/router-active/router-active.directive';


import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';

import { AuthHttp, tokenNotExpired } from 'angular2-jwt';

import {AuthService} from './services/auth.service';

import {Home} from './home';

import {Shop} from './shop/shop.component';
import {ShopAdd} from './shop/add.component';
import {ShopList} from './shop/list.component';

import {ShopSearch} from './shop/search.component';

import {MdDropdown} from './components/md-dropdown.component';

import {Test} from './test/test';


import {Signin} from './auth/signin.component';

import {Signup} from './auth/signup.component';

import {Material2App} from './material-demo/material2-app.component';

//import {Product} from './product/product.component';
//import {Products} from './product/products.component';
///import {PrdRoot} from './prd/prd-root.component';


//import {Shop} from './shop/shop.component';

// Import Products component
import {Products} from './products/products.component';
import {Product} from './product/product.component';
import {ProductAdd} from './product/add.component';


import {ProductList} from './product/list.component';
import {PList} from './product/plist.component';

import {CartList} from './cart/list.component';


import {ProductDetails} from './product/details.component';


import {WindowRef, WINDOW_PROVIDERS} from './window.service';
import {SharedService} from './services/shared.service';

import {UserService} from './auth/user.service';

import {FileUpload} from './demo/file-upload';

import {Demo} from './demo/demo';

import {MapAutocomplete} from './components/map-auto';
import {Avatar} from './profile/avatar.component';

import {Profile} from './profile/profile.component';

/*
 * App Component
 */

@Component({
  selector: 'app',
  providers: [ANGULAR2_GOOGLE_MAPS_PROVIDERS, AuthService],
  directives: [ MdDropdown, MapAutocomplete,
      RouterActive,
      MD_SIDENAV_DIRECTIVES, MdIcon, MdToolbar  ],
  encapsulation: ViewEncapsulation.None,
  pipes: [],
  styles: [`
    .sebm-google-map-container {
      height: 300px;
    }
  `],
  // Load our main `Sass` file into our `app` `component`
  styleUrls: [require('!style!css!sass!../sass/main.scss')],
  //template: require('./app.side.nav.html')
  template: require('./app.html')
})
/*
@Routes([
  {path: '/crisis-center', component: CrisisListComponent},
  {path: '/heroes',        component: HeroListComponent},
  {path: '/hero/:id',      component: HeroDetailComponent}
])
*/
@RouteConfig([
  { path: '/', name: 'Index', component: Home, useAsDefault: true },
  { path: '/home',  name: 'Home',  component: Home },
  { path: '/shop', component: Shop, name: 'Shop' },
  { path: '/shopadd', component: ShopAdd, name: 'ShopAdd' },
  { path: '/shoplist', component: ShopList, name: 'ShopList' },
  { path: '/cartlist', component: CartList, name: 'CartList' },
  { path: '/file', component: FileUpload, name: 'FileUpload' },
  { path: '/demo', component: Demo, name: 'Demo' },

  { path: '/map', component: MapAutocomplete, name: 'MapAutocomplete' },


 // { path: '/shopsearch', component: ShopSearch, name: 'ShopSearch' },
  { path: '/search', component: ShopSearch, name: 'ShopSearch' },


  { path: '/products', component: Products, name: 'Products' },
  { path: '/product', component: Product, name: 'Product' },
  { path: '/signup', component: Signup, name: 'Signup' },
  { path: '/signin', component: Signin, name: 'Signin' },
  { path: '/avatar', component: Avatar, name: 'Avatar' },
  { path: '/profile', component: Profile, name: 'Profile' },


  { path: '/test', component: Test, name: 'Test' },
  { path: '/material', component: Material2App, name: 'Material' },
  { path: '/productadd/:shopid', component: ProductAdd, name: 'ProductAdd' },
  { path: '/productlist/:shopid', component: ProductList, name: 'ProductList' },

  //Products List by shop for customer
  { path: '/plist/:shopid', component: PList, name: 'PList' },

  { path: '/productdetails/:id', component: ProductDetails, name: 'ProductDetails' },


  // Async load
  { path: '/about', name: 'About', loader: () => require('es6-promise!./about')('About') },
])
export class App {
  angularLogo = 'assets/img/angular-logo.png';
  name = 'Angular Shop';
  url = 'https://google.com/';
 private latitude: number = 51.678418;
 private longitude : number = 7.809007;



 //public SIDE_MENU_BREAKPOINT: string = 'gt-md';

 @ViewChild(MdSidenav) private menu: MdSidenav;

 //@Input()
 //fullPage: boolean = true;

 public site: string = 'Angular2 Material';

 version: string;

 angularVersion: string = null;
 linkTag: string = null;

 //  components: IComponentMeta[] = [];

 private _subscription = null;
 public navigation = {};

  //If using Auth0 for SSO
  //lock = new Auth0Lock('tN9xVfIaUEeUCrFxleVwhIoObMbSe9be', 'xxx.auth0.com');
 items = ['A', 'B', 'C', 'Pizza'];

  constructor(public appState: AppState,
      private auth: AuthService,
      public s: SharedService,
      private u: UserService) {

    

    s.userId = "";
    s.userEmail = "";
    //u.id = 'u.id = '574c5677c534abb86bf27452';'
    u.id = '574c5677c534abb86bf27452';
    u.id = '575465132056a2184f8262f6';
    u.email = 'auto';
    
    //Asking for get current location and stroring it  in user service
    if (window && window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log('location', position);
                if (position.coords) {
                    u.location = position.coords;
                    u.latitude = position.coords.latitude;
                    u.longitude = position.coords.longitude;
                }
               
            }
        )
    } // if

  }

  login() {
    this.auth.login();
  }
  logout() {
    this.auth.logout();
  }
  
  loggedIn(){
    
    return false;
  }
  
/*

login() {
    var hash = this.lock.parseHash();
    if (hash) {
      if (hash.error)
        console.log('There was an error logging in', hash.error);
      else
        this.lock.getProfile(hash.id_token, function(err, profile) {
          if (err) {
            console.log(err);
            return;
          }
          localStorage.setItem('profile', JSON.stringify(profile));
          localStorage.setItem('id_token', hash.id_token);
        });
    }
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
  }

  loggedIn() {
    return tokenNotExpired();
  }

*/
  // Fire off upon initialization
  ngOnInit() {
    console.log('Initial App Loading');

    console.log('Initial App State', this.appState.state);
  }











  get pushed(): boolean { return this.menu && this.menu.mode === 'side'; }

  get over(): boolean { return this.menu && this.menu.mode === 'over' && this.menu.opened; }

  // TODO(jd): these two property hacks are to work around issues with the peekaboo fixed nav
  // overlapping the sidenav and toolbar.  They will not properly "fix" to the top if inside
  // md-sidenav-layout, and they will overlap the sidenav and scrollbar when outside.  So just
  // calculate left and right properties for fixed toolbars based on the media query and browser
  // scrollbar width.  :sob: :rage:
  @Input()
  get sidenavWidth(): number { return this.pushed ? 281 : 0; }

  @Input()
  get scrollWidth(): number {
      var inner = document.createElement('p');
      inner.style.width = '100%';
      inner.style.height = '200px';

      var outer = document.createElement('div');
      outer.style.position = 'absolute';
      outer.style.top = '0px';
      outer.style.left = '0px';
      outer.style.visibility = 'hidden';
      outer.style.width = '200px';
      outer.style.height = '150px';
      outer.style.overflow = 'hidden';
      outer.appendChild(inner);

      document.body.appendChild(outer);
      var w1 = inner.offsetWidth;
      outer.style.overflow = 'scroll';
      var w2 = inner.offsetWidth;
      if (w1 == w2) w2 = outer.clientWidth;

      document.body.removeChild(outer);

      return (w1 - w2);
  };
/*
  ngOnInit() {
      this.http.get('version.json').subscribe((res: Response) => {
          const json = res.json();
          this.version = json.version;
          this.angularVersion = json['@angular/core'];
          this.linkTag = this.angularVersion.replace(/[>=^~]/g, '');
      });
      this._components.getComponents().then((comps) => {
          this.components = comps;
          let title = 'Angular2 Shop';
          document.title = title;
          this.navigation.currentTitle = title;
          this.navigation.prevLink = this.navigation.componentLink(comps[comps.length - 1]);
          this.navigation.nextLink = this.navigation.componentLink(comps[0]);
      });
  }
  */







}
