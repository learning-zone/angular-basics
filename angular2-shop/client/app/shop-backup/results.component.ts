import {Component,Input,Output} from '@angular/core';
import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';
import {MdList, MdListItem} from '@angular2-material/list';
import {ShopLine} from './line.component';
@Component({
    selector: 'shop-search-results',

    providers: [
//        ShopService,
        ANGULAR2_GOOGLE_MAPS_PROVIDERS,
    ],
    directives: [
        ANGULAR2_GOOGLE_MAPS_DIRECTIVES,
        MdList, 
        MdListItem,
        ShopLine
//        RouterActive
    ],
    pipes: [],
    styles: [`
    .sebm-google-map-container {
      height: 300px;
    }
  `],
    template: require('./results.html')
})

export class ShopSearchResults {
    @Input() showMap: boolean;
    @Input() shops: Array<any> = [];
    @Input() items: Array<any> = [];
    @Input() para: string = 'ddddd';

    constructor() {
        console.log("in ressss");

        console.log("in ressss...",this.items);

    }

    

  selectItem(item) {  }


}
