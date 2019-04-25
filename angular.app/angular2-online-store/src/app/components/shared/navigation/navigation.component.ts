import { Component, OnInit } from '@angular/core';
import { Observable }        from 'Rxjs'
import { Store}              from '@ngrx/store';

import * as fromRoot from '../../../reducers';
import { IShoppingCartItem } from '../../../models';

@Component({
    selector: 'navigation',
    templateUrl: 'navigation.component.html',
    styleUrls: [
        'navigation.component.css'
    ]
})
export class NavigationComponent implements OnInit {

    public cartSize$: Observable<number>;


    constructor(private store: Store<fromRoot.State>) {

    }

    public ngOnInit(): void {
        this.cartSize$ = this.store
            .select('shoppingCart')
            .map((items: IShoppingCartItem[]) => items.length)
    }
}
