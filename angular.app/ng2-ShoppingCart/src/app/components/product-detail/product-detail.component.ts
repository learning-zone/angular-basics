import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { CartAction } from 'app/store/actions/cart.actions';

@Component({
    selector: 'product-detail',
    templateUrl: 'product-detail.component.html',
    styleUrls: ['product-detail.component.scss']
})

export class ProductDetailComponent {
    selectedProduct:Product;
    quantity: number;
    constructor(
        private productService:ProductService,
        private route:ActivatedRoute,
        private location:Location,
        private cartStore: CartAction
    ) { }

    addToCart(product) {
        this.cartStore.addToCart(product, this.quantity || 1)
    }

    // When initialized, fetch for the product info based on the product id and set it as selectedProduct
    ngOnInit() {
        this.route.params.forEach(param => {
            let id = parseInt(param['id'])
            this.productService.getProduct(id)
                .then(product => this.selectedProduct = product)
        })
    }

    goBack() {
        this.location.back()
    }
}