import { ActionReducer, combineReducers } from '@ngrx/store';

import { environment } from '../../environments/environment';

import * as fromRouter from '@ngrx/router-store';

import * as fromShoppingCart from './shopping-cart.reducer';

import { compose } from '@ngrx/core';

import { storeFreeze } from 'ngrx-store-freeze';

export interface State {
    shoppingCart: any;
}

const reducers = {
    shoppingCart: fromShoppingCart.reducer,
    router: fromRouter.routerReducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
    if (environment.production) {
        return productionReducer(state, action);
    }
    else {
        return developmentReducer(state, action);
    }
}