import { Computer } from './computer.model';

//For values to be stored in localStorage
export interface IShoppingCartLocalStorageItem {
    _id: number;        //unique key,
    quantity: number;   //quantity of these computers in the cart
}

//For values to be rendered on ShoppingCartPage
export interface ICartProductItem extends Computer {
    quantity: number;
}


export interface IShoppingCartItem {
    quantity: number;
    product: Computer;
}