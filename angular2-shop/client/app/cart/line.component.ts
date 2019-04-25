import {Component,Input,Output} from '@angular/core';
import {MdList, MdListItem} from '@angular2-material/list';
@Component({
    selector: 'cart-line',

    providers: [
//        ShopService,
//        ANGULAR2_GOOGLE_MAPS_PROVIDERS,
    ],
    directives: [
//        ANGULAR2_GOOGLE_MAPS_DIRECTIVES,
        MdList, 
         MdListItem
//        RouterActive
    ],
    pipes: [],
    styles: [],
    template: require('./line.html')
})

export class CartLine {
    @Input() showMap: boolean;
    @Input() shops: Array<any> = [];
    @Input() items: Array<any> = [];
    @Input() para: string = '';
    @Input() item: any;
    constructor() {
       
    }

    

  selectItem(item) {  }

  remove() {
      alert('removing');
      this.item.removed = true;
  }
}
