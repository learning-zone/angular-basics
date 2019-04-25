import {Component,Input,Output} from '@angular/core';

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
import {ShopSearchResults} from './results.component';

// Create metadata with the `@Component` decorator
@Component({
    // HTML tag for specifying this component
    selector: 'shop-search',
  
//    providers: [...HTTP_PROVIDERS, ShopService],

    providers: [
        ...HTTP_PROVIDERS,
        ShopService,
        ANGULAR2_GOOGLE_MAPS_PROVIDERS,
  //      AuthService
    ],
    directives: [
        MdSwitch,
        ANGULAR2_GOOGLE_MAPS_DIRECTIVES,
        ShopSearchResults
//        RouterActive
    ],
    //encapsulation: ViewEncapsulation.None,
    pipes: [],
    styles: [`
    .sebm-google-map-container {
      height: 200px;
    }
  `],
    template: require('./search.html')
})
export class ShopSearch {

    myForm: ControlGroup;
    error: string;

  // Initialize our `shopData.text` to an empty `string`
  shopData = {
    text: ''
  };
  url = 'https://google.com/';
  public latitude: number = 51.678418;
  public longitute: number = 7.809007;
  //lon: number = 7.809007;
  public zoom: number = 16;

  public limitResults: number = 10;

  public isPickup = true;
  public isDelivery = true;
  public isVeg = true;
  private searchShop: boolean = true;
  private showMyLocation: boolean = false;

  private showResultsShop: boolean = false;
  private showResultsProduct: boolean = false;
  public showSearchForm: boolean = true;
  

  private moreOptions: boolean = true;

  private radius: number =5;

  private mode='';
  private currentItem= {text:'',userId:''};
  private items: Array<any> = [];
  private products: Array<any> = [];

  private user: Array<any>;

  private shops: Array<any> = [];
  constructor(public shopService: ShopService, private u: UserService) {
      console.log('In Shop Search constructor!');
      //u.id = '574c5677c534abb86bf27452';
      u.setLocation();

      let fb = new FormBuilder();

      this.myForm = fb.group({
          query: ['', Validators.required],
          radius: [''],
          location: [''],
		  isShop: [''],
          isVeg: [''],
          isDelivery: [''],
          isPickup: ['']

      });

      this.error = '';
    //passing id
      shopService.userId = u.id;
      this.latitude = u.latitude;
      this.longitute = u.longitude;
      //this.shops = [];
      console.log('getting data!');
     
    shopService.getAll()
        .subscribe((res) => {

            console.log('In Shop Search constructor! results',res);

            console.log(res);
      
            this.shops = res;
            this.items = res;
            
        });
  }

changeMode(newMode) {

      this.mode=newMode;
      //this.mode='edit';
  }


submit(data) {
    console.log('going to home aub', this.myForm.valid);
    if (this.myForm.valid || 1) {
        this.showSearchForm = false;
        this.showResultsShop = true;
         //alert('valid');
        //alert(this.u);
        let sendData = {
           // title: data.title,
            cuisine: data.cuisine,
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
                //console.log('ssss');
                //console.log(res);
                console.log(res._id);
                //this.u.id = res._id;
                if (this.u.id) {
                  //  this.u.email = res.email;
                    //this.u.isLogged = true;
                    //                    this.router.navigate(['/home']);
                    console.log('going to home')
                //    this.router.parent.navigate(['Home']);
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
      //this.u.shopTitle = item.title;

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
