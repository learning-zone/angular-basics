import {Component} from '@angular/core';

import {ProductService} from './product.service';

import {HTTP_PROVIDERS} from '@angular/http';

import {NgFor} from '@angular/common';

import {UserService} from '../auth/user.service';


import {MdSwitch} from "ng2-material";
import {RouteConfig, Router, RouteParams} from '@angular/router-deprecated';


import {FormBuilder, ControlGroup, Validators} from '@angular/common';


@Component({
    selector: 'product-add',
  
    providers: [
        ...HTTP_PROVIDERS,
        ProductService,
       
    ],
    directives: [
        MdSwitch,
       
    ],
    //encapsulation: ViewEncapsulation.None,
    pipes: [],
    styles: [],
    template: require('./add.html')
})
export class ProductAdd {

    myForm: ControlGroup;
    error: string;
    public shopId: string;
    public showForm: boolean = true;  
    public url = 'https://google.com/';
    public latitude: number = 51.678418;
    public longitude: number = 7.809007;
    public zoom: number = 16;
    public isPickup = false;
    public isDelivery = false;
    public isVeg = true;

    mode = '';
    currentItem = { text: '', userId: '' };
    private products: Array<any> = [];

    reset() {
        this.createForm();
    }
    createForm() {
        //this.createForm();
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

    }

    constructor(public params: RouteParams,
        public router: Router,
        public productService: ProductService, private u: UserService) {
        u.currency = 'Rs';
        u.setLocation();
     
        this.shopId = params.get('shopid');
        console.log('In Product constructor!', this.shopId);

        
        this.error = '';
        productService.userId = u.id;
        this.latitude = u.latitude;
        this.longitude = u.longitude;
        this.createForm();
    }
    
    submit(data) {
        if (this.myForm.valid || 1) {
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
                longitude: this.u.longitude
                //lng:
            };
            this.productService.create(sendData)
                .subscribe((res) => {
                    console.log(res._id);
                    if (this.u.id) {
                        console.log('refresh form')
                        this.router.parent.navigate(['ProductAdd', { shopid: this.shopId }])
                        this.showForm = false;
                        alert('Product Added!, You can add more!!');
                        this.showForm = true;
                        this.reset();
                    }

                });

        }
    }//submit

    mapClicked($event: any) {
        console.log('map click');
        console.log($event.coords.lat, $event.coords.lng);
        this.u.latitude = $event.coords.lat;
        this.u.longitude = $event.coords.lng;
    }
}
