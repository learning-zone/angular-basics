import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { CartAction } from 'app/store/actions/cart.actions';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent {
  
  products:Product[];
  quantity: number;

  // Angular will know to supply an instance of the ProductService & Router when it creates a new ProductComponent
  // Because they are injected in the constructor
  constructor (private productService:ProductService, private router:Router, private cartStore: CartAction) {

  }

  // Dynamic route for detail info when a product is clicked
  clickedProduct(product) {
    let link = ['/detail', product.id];
    this.router.navigate(link);
  }

  // When add to cart button is clicked
  addToCart(product) {
    // this.productService.addToCart(product)
    console.log(this.quantity)
    this.cartStore.addToCart(product, this.quantity || 1)
  }

  getProductData() {     
     this.productService.getProducts().then(products => this.products = products)
  }

  ngOnInit() {
    // Get initial data from productService to display on the page
    this.getProductData()
  }

}