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

import {MdSwitch} from "ng2-material";


import {FormBuilder, ControlGroup, Validators} from '@angular/common';
import {RouteConfig, Router, RouteParams} from '@angular/router-deprecated';



import {MapAutocomplete} from '../components/map-auto';


// Create metadata with the `@Component` decorator
@Component({
    // HTML tag for specifying this component
    selector: 'shop-add',
  
//    providers: [...HTTP_PROVIDERS, ShopService],

    providers: [
        ...HTTP_PROVIDERS,
        ShopService,
      //  ANGULAR2_GOOGLE_MAPS_PROVIDERS,
  //      AuthService
    ],
    directives: [
        MdSwitch,
        MapAutocomplete,
        //ANGULAR2_GOOGLE_MAPS_DIRECTIVES,
//        RouterActive
    ],
    //encapsulation: ViewEncapsulation.None,
    pipes: [],
    styles: [`
    .sebm-google-map-container {
      height: 200px;
    }
  `],
    template: require('./add_edit.html')
})
export class ShopAdd {

    myForm: ControlGroup;
    error: string;

  // Initialize our `shopData.text` to an empty `string`
  shopData = {
    text: ''
  };
  url = 'https://google.com/';
  public id: string = '';

  public latitude: number = 51.678418;
  public longitude: number = 7.809007;
  public zoom: number = 16;
  public isPickup = true;
  public isDelivery = true;
  public isVeg = true;
  public allDay = true;
  public day1 = true; //Monday
  public day2 = true;
  public day3 = true;
  public day4 = true;
  public day5 = true;
  public day6 = true;
  public day7 = true; //Sunday


  public callAndConfirm = false; 
  public phone : number = 0; 


  public advanceOrderOnly = true;

  public openTime: number = 12.30;
  public closeTime: number = 21.30;
  public prepareTime: number = 1.00;
  public deliveryTime: number = 1.00;

  public minDeliveryOrder: number = 200;
  public minOrder: number = 200;
  public discount: number = 10;
  

  mode='';
  currentItem= {text:'',userId:''};
  private shops: Array<any> = [];

  constructor(public router: Router,
      public shopService: ShopService,
      private u: UserService) {

      console.log('In Shop constructor!', u.latitude, u.longitude);
      //u.id = '574c5677c534abb86bf27452';
      u.setLocation();

      console.log('In Shop constructor!', u.latitude, u.longitude);
      
      let fb = new FormBuilder();

      this.myForm = fb.group({
          title: ['Mrs.... Kitchen', Validators.required],
          cuisine: ['Continental', Validators.required],
          description: ['The best home made food in your locality'],
          address: ['Somewhere in earth'],
          city: [''],


          isVeg: [''],
          isDelivery: [''],
          isPickup: ['']

      });

      this.error = '';
    //passing id
      shopService.userId = u.id;
      this.latitude = u.latitude;
      this.longitude = u.longitude;
      //this.shops = [];
    shopService.getUserShops(u.id)
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


submit(data) {
    console.log('going to home aub', this.myForm.valid);
    if (this.myForm.valid || 1) {
        alert(this.myForm.valid);
        //alert(this.u);
        let sendData = {
            title: data.title,
            cuisine: data.cuisine,
            description: data.description,
            address: data.address,
            city: data.city,

            isVeg: this.isVeg,
            isDelivery: this.isDelivery,
            isPickup: this.isPickup,
            userId: this.u.id,
            latitude: this.u.latitude,
            longitude:this.u.longitude
            //lng:
        };
        console.log("ddd",sendData);
        this.shopService.create(sendData)
            .subscribe((res) => {
                console.log('ssss');
                console.log(res);
                console.log(res._id);
                //this.u.id = res._id;
                if (this.u.id) {
                  //  this.u.email = res.email;
                    //this.u.isLogged = true;
                    //                    this.router.navigate(['/home']);
                    alert('Shop Added! Please add products');
                    console.log('going to product add page')
                    this.router.parent.navigate(['ShopList']);

                    //this.router.parent.navigate(['ProductAdd', {shopid:res._id}]);
                }

            });

    }
}//submit

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
  mapClicked($event: any) {
      console.log('map click');
      console.log($event.coords.lat, $event.coords.lng);
      this.u.latitude = $event.coords.lat;
      this.u.longitude = $event.coords.lng;
  }
}
