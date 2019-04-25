import { Injectable }              from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable }              from 'rxjs/Observable';
import { Subject }                 from 'rxjs/Subject';
import 'rxjs/Rx';   //operator polyfills

import {
    Computer,
    DirOptions,
    ICartProductItem,
    IShoppingCartLocalStorageItem,
    Notification
} from '../models/index';

import { ApiService, IApiResponse } from './api.service';
import { NotificationService } from './notification.service';

//TODO add caching mechanism
//TODO Refactor the implementation to be more reactive and elegant

interface IShoppingCartService {
    cartItemsStream: Observable<ICartProductItem[]>;
    cartSizeStream: Observable<number>
    addToCart(id: number): void;
    changeQuantity(id: number, newQuantity: number): void;
    removeFromCart(id: number): void
}

interface ICartStore {
    items:  IShoppingCartLocalStorageItem[],
}

@Injectable()
export class ShoppingCartService implements IShoppingCartService {

    private cartStream:           Subject<ICartProductItem[]>;
    private cartSizeValueStream:  Subject<number>;
    private cartStore: ICartStore  = {items: []};

    constructor(private apiService: ApiService, private notificationService: NotificationService) {

        this.cartStream = new Subject<ICartProductItem[]>();
        this.cartSizeValueStream = new Subject<number>();

        //Reading the data stored in localStorage
        if(!!localStorage.getItem('items')){
            this.cartStore.items = JSON.parse(localStorage.getItem('items'));
        }
    }

    public get cartItemsStream(): Observable<ICartProductItem[]> {
        return this.cartStream.asObservable();
    }

    public get cartSizeStream(): Observable<number> {
        return this.cartSizeValueStream.asObservable();
    }

    public loadCart() {
        this.emitData();
    }

    public loadCartSizeValue (){
        this.emitCartSizeValue();
    }

    public addToCart(id: number): void{

        //NOTE: Emitting new data from cartStream Observable is not necessary
        //because it will fetch and render the data on ShoppingCartComponent's initialization

        if (this.cartStore.items.find(item => item._id === id)) {
            //If the item is already in the cart
            this.notificationService.push(new Notification(
                'The computer is already in the cart!',
                'Visit ShoppingCart page to to purchase',
                'assets/images/notifications/warn.gif',
                DirOptions.auto
            ));
        } else {
            this.cartStore.items.unshift({
                _id: id,
                quantity: 1
            });
            this.updateLocalStorage();

            //Increasing cartSize and notifying the listeners
            this.emitCartSizeValue();

            //Notify users about the result
            this.notificationService.push(new Notification(
                'Successfully added to the cart!',
                'Visit ShoppingCart page to to purchase',
                'assets/images/notifications/success.png',
                DirOptions.auto
            ))
        }
    }

    public removeFromCart(id: number): void{
        let itemIndex = this.cartStore.items.findIndex(item => item._id === id);
        this.cartStore.items.splice(itemIndex, 1);
        this.updateLocalStorage();

        //Emitting new data(ShoppingCartPageComponent's view has to be rerendered)
        this.emitData();

        //Decreasing cartSize and notifying the listeners
        this.emitCartSizeValue();

        //Notifying the users about it
        this.notificationService.push(new Notification(
            'Item was removed from the cart!',
            'Go to catalog page to add more items',
            'assets/images/notifications/warn.gif',
            DirOptions.auto
        ));
    }

    public changeQuantity(id: number, newQuantity: number): void{

        let itemIndex = this.cartStore.items.findIndex(item => item._id == id);

        if( itemIndex >= 0 ) {
            this.cartStore.items[itemIndex]['quantity'] = newQuantity;
            this.updateLocalStorage();

            //We have to fire the data to rerender the ShoppingCartPageComponent view
            this.emitData();
        }
    }

    private updateLocalStorage(): void {
        localStorage.setItem('items', JSON.stringify(this.cartStore.items));
    }

    private emitData() {

        let simpleReturn = e => e;

        //noinspection TypeScriptUnresolvedFunction
        let fetchFromServer = (item: IShoppingCartLocalStorageItem) => {
            //noinspection TypeScriptUnresolvedFunction
            return this.apiService.getComputerById(item._id).map(getDataFromResponse);
        };

        let getDataFromResponse = (response: IApiResponse<Computer>): ICartProductItem => {
            let computer = response.data[0];
            let i = this.cartStore.items.findIndex(i => i._id == computer._id);
            return Object.assign(computer, {quantity: this.cartStore.items[i]['quantity']});
        };

        //TODO Use merge for startup request stream and others!
        let initialRequestStream = () => {};


        let createInitialStream = () => {
            //noinspection TypeScriptUnresolvedFunction
            return Observable.from(this.cartStore.items)
        };

        //noinspection TypeScriptUnresolvedFunction
        createInitialStream()
            .map(fetchFromServer)
            .map(simpleReturn)
            .combineAll()
            .subscribe(data => {
                this.cartStream.next(<ICartProductItem[]>data);
            });
    }

    private emitCartSizeValue(): void {
        console.log("Emitting cartSize value", this.cartStore.items.length);
        this.cartSizeValueStream.next(this.cartStore.items.length);
    }
}


