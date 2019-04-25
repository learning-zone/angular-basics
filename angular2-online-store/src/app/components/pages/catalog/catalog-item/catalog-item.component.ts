import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store }  from '@ngrx/store';

import { Computer } from '../../../../models';

import * as fromRoot from '../../../../reducers';
import * as shoppingCart from '../../../../actions/shopping-cart.action';

@Component({
    selector: 'catalog-item',
    templateUrl: 'catalog-item.component.html',
    styleUrls: [
        'catalog-item.component.css'
    ]
})
export class CatalogItemComponent {

    @Input() private item: Computer;

    constructor(
        private router: Router,
        private store: Store<fromRoot.State>
    ){}

    public addToCart(): void {
        this.store.dispatch(
            new shoppingCart.AddToCartAction(Object.assign({product: this.item, quantity: 1}))
        )
    }

    public preview(id: number): void {
        this.router.navigate(['/catalog', id]);
    }
}

