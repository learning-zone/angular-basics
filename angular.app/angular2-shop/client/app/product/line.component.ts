import {Component,Input,Output} from '@angular/core';
import {MdList, MdListItem} from '@angular2-material/list';
@Component({
    selector: 'product-line',

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

export class ProductLine {
    @Input() showMap: boolean;
    @Input() shops: Array<any> = [];
    @Input() items: Array<any> = [];
    @Input() para: string = 'ddddd';
    @Input() item: any;
    constructor() {
        console.log("in ressss");

        console.log("in ressss...",this.items);

    }

    

  selectItem(item) {  }


}
