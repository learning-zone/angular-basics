import {Component} from '@angular/core';

import {ProductService} from './product.service';

import {ShopService} from '../shop/shop.service';

// We `import` `http` into our `ProductService` but we can only
// specify providers within our component
import {HTTP_PROVIDERS} from '@angular/http';

// Import NgFor directive
import {NgFor} from '@angular/common';

import {UserService} from '../auth/user.service';


import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';

import {MdSwitch} from "ng2-material";
//import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, RouteParams} from
//'@angular/router';
import {RouteConfig, Router, RouteParams} from '@angular/router-deprecated';


import {FormBuilder, ControlGroup, Validators} from '@angular/common';


// Create metadata with the `@Component` decorator
@Component({
    // HTML tag for specifying this component
    selector: 'product-list',
  
//    providers: [...HTTP_PROVIDERS, ProductService],

    providers: [
        ...HTTP_PROVIDERS,
        ProductService,
        ShopService,
        ANGULAR2_GOOGLE_MAPS_PROVIDERS,
  //      AuthService
    ],
    directives: [
        MdSwitch,
        ANGULAR2_GOOGLE_MAPS_DIRECTIVES,
//        RouterActive
    ],
    //encapsulation: ViewEncapsulation.None,
    pipes: [],
    styles: [`
    .sebm-google-map-container {
      height: 200px;
    }
  `],
    template: require('./list.html')
})


export class ProductList {
    public shop: any;

    myForm: ControlGroup;
    error: string;
    public shopId: string='aa';
  // Initialize our `productData.text` to an empty `string`
  productData = {
    text: ''
  };
  url = 'https://google.com/';
  public latitude: number = 51.678418;
  public longitude: number = 7.809007;
  public zoom: number = 16;

  public isPickup = false;
  public isDelivery = false;
  public isVeg = true;

  mode='';
  currentItem= {text:'',userId:''};
  private products: Array<any> = [];

  private items: Array<any> = [];

  constructor(public params: RouteParams,
      public productService: ProductService,
      public shopService: ShopService,      
      private u: UserService)
  {
      console.log('In Product constructor!', params.get('shopid'));
      console.log('In Product constructor!', params.get('id'));

     // u.id = '574c5677c534abb86bf27452';
      u.currency = 'Rs';
      u.setLocation();
      this.shopId = params.get('shopid');
      if (!this.shopId){          
          this.shopId = params.get('shopid');
      }
      console.log('In Product List constructor!',this.shopId);
      this.shop = {}
      this.shop.title = '..'

      shopService.get(this.shopId)
          .subscribe((res) => {
              console.log('In Get Shop Product List constructor!', res);
              this.shop = res;
          });
  
      productService.getProductsByShop(this.shopId)
      //productService.getAll()
          .subscribe((res) => {
              console.log('In Product getProductsByShop!', res);      
              this.items = res;             
          });

      let fb = new FormBuilder();

      this.myForm = fb.group({
          title: ['', Validators.required],
          cuisine: ['', Validators.required],
          price: ['', Validators.required],
          url: [''],
          imageUrl: [''],
          image: [''],
          isVeg: [''],
          isDelivery: [''],
          isPickup: ['']

      });

      this.error = '';
    //passing id
      productService.userId = u.id;
      this.latitude = u.latitude;
      this.longitude = u.longitude;
      //this.lng = u.longitude;
      //this.products = [];
    productService.getUserProducts(u.id)
        // `Rxjs`; we subscribe to the response
        .subscribe((res) => {

            // Populate our `product` array with the `response` data
            this.products = res;
            // Reset `product` input
            this.productData.text = '';
        });
  }

changeMode(newMode) {

      this.mode=newMode;
      //this.mode='edit';
  }


submit(data) {
    console.log('in submit of product add', this.myForm.valid);
    if (this.myForm.valid || 1) {
         alert('valid');
        //alert(this.u);
        let sendData = {
            title: data.title,
            price: data.price,
            rate: data.price,
            currency: this.u.currency,
            shopId: this.shopId,

            isVeg: this.isVeg,
            isDelivery: this.isDelivery,
            isPickup: this.isPickup,
            userId: this.u.id,
            latitude: this.u.latitude,
            longitude:this.u.longitude
            //lng:
        };
        console.log("ddd",sendData);
        this.productService.create(sendData)
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
      this.productService.create(this.currentItem)
        .subscribe((res) => {

            // Populate our `product` array with the `response` data
            this.products = res;

            // Reset `product` input
            this.productData.text = '';
            this.mode='';
        });
  }
  
  save() {
    this.create();
    
  }

  selectItem(item) {
      //this.u.productId = item._id;
      //this.u.productTitle = item.title;

      this.currentItem = item;
      this.mode = 'edit';

  }

 startEdit(item) {
   this.currentItem = item;
   this.mode='edit';
    
  }
  
  delete(id) {

    this.productService.delete(id)
      .subscribe((res) => {

          // Populate our `product` array with the `response` data
          this.products = res;
      });
 }
  mapClicked($event: any) {
      console.log('map click');
      console.log($event.coords.lat, $event.coords.lng);
      this.u.latitude = $event.coords.lat;
      this.u.longitude = $event.coords.lng;
  }
}
