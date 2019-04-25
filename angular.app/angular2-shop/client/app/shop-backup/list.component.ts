import {Component} from '@angular/core';

import {ShopService} from './shop.service';

// We `import` `http` into our `ShopService` but we can only
// specify providers within our component
import {HTTP_PROVIDERS} from '@angular/http';

// Import NgFor directive
import {NgFor} from '@angular/common';

import {UserService} from '../auth/user.service';


import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';
import {MdList, MdListItem} from '@angular2-material/list';

//import {MATERIAL_DIRECTIVES} from 'ng2-material';

//import {MdListItem} from 'ng2-material'

// Create metadata with the `@Component` decorator
@Component({
    // HTML tag for specifying this component
    selector: 'shop-list',
  
//    providers: [...HTTP_PROVIDERS, ShopService],

    providers: [
        ...HTTP_PROVIDERS,
        ShopService,
        ANGULAR2_GOOGLE_MAPS_PROVIDERS,
  //      AuthService
    ],
    directives: [
        ANGULAR2_GOOGLE_MAPS_DIRECTIVES,
        MdList, 
         MdListItem
//        RouterActive
    ],
    //encapsulation: ViewEncapsulation.None,
    pipes: [],
    styles: [`
    .sebm-google-map-container {
      height: 300px;
    }
  `],
    template: require('./list.html')
})
export class ShopList {

  // Initialize our `shopData.text` to an empty `string`
  shopData = {
    text: ''
  };
  url = 'https://google.com/';
  public latitude: number = 51.678418;
  public longitude: number = 7.809007;
  public zoom: number = 16;

  mode='';
  currentItem= {text:'',userId:''};
  private shops: Array<any> = [];
  private allshops: Array<any> = [];

  constructor(public shopService: ShopService, private u: UserService) {
      console.log('Shop constructor go!');
    //passing id
      shopService.userId = u.id;
      this.latitude = u.latitude;
      this.longitude = u.longitude;
    //  this.lng = u.longitude;
      //this.shops = [];
    //shopService.getUserShops(u.id)
	shopService.getAll()
        // `Rxjs`; we subscribe to the response
        .subscribe((res) => {

            // Populate our `shop` array with the `response` data
            this.shops = res;
            // Reset `shop` input
            this.shopData.text = '';
        });
  }

changeMode(newMode) {

      this.mode=newMode;
      //this.mode='edit';
  }

  create() {
      this.currentItem.userId = this.u.id;  
      this.shopService.create(this.currentItem)
        .subscribe((res) => {

            // Populate our `shop` array with the `response` data
            this.shops = res;

            // Reset `shop` input
            this.shopData.text = '';
            this.mode='';
        });
  }
  
  save() {
    this.create();
    
  }

  selectItem(item) {
      this.u.shopId = item._id;
      this.u.shopTitle = item.title;

      this.currentItem = item;
      this.mode = 'edit';

  }

 startEdit(item) {
   this.currentItem = item;
   this.mode='edit';
    
  }
  
  delete(id) {

    this.shopService.delete(id)
      .subscribe((res) => {

          // Populate our `shop` array with the `response` data
          this.shops = res;
      });
  }
}
