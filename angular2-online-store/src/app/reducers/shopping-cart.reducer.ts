import * as shoppingCart from '../actions/shopping-cart.action';

import { IShoppingCartItem } from '../models';

export type State = Array<IShoppingCartItem>;

const initialState = [];

export function reducer(state = initialState, action: shoppingCart.Actions): State {
    switch (action.type) {
        case shoppingCart.ActionTypes.ADD_TO_CART: {

            const isAlreadyInCart = state.find(
                (item: IShoppingCartItem) => item.product._id == action.payload.product._id
            );

            if (isAlreadyInCart) {
                console.warn('Already in the cart!');
                return state;
            }

            console.info("Successfully added!");
            return [...state, action.payload]
        }
        case shoppingCart.ActionTypes.REMOVE_FROM_CART: {
            const itemToRemoveIndex = state.findIndex((item: IShoppingCartItem): boolean => {
                return item.product._id === action.payload.product._id;
            });

            return [...state.slice(0, itemToRemoveIndex), ...state.slice(itemToRemoveIndex + 1)];
        }
        case shoppingCart.ActionTypes.CHANGE_QUANTITY: {
            const itemToChangeIndex = state.findIndex((item: IShoppingCartItem): boolean => {
                return item.product._id === action.payload.product._id;
            });

            return [...state.slice(0, itemToChangeIndex), action.payload, ...state.slice(itemToChangeIndex + 1)];
        }

        default:
            return state;
    }
}