import { Injectable } from '@angular/core';
import { PRODUCTS } from '../models/product-data';
import { Product } from '../models/Product'; 
import { Observable, Subject } from 'rxjs';

// The consumer of angular services doesn't know how the service gets the data. 
// This ProductService could get the data from anywhere. 
// It could get the data from a web service or local storage or from a mock data source.
// That's the beauty of removing data access from the component. 
// We can change our minds about the implementation as often as we like, for whatever reason, 
// without touching any of the components that need the data.
@Injectable()
export class ProductService {

    constructor() {

    }

    getProducts() {
        return Promise.resolve(PRODUCTS)
    }

    getProduct(id) {
        return this.getProducts()
                    .then(products => products.find(product => product.id === id))
    }

}