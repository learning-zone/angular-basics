import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Computer }                               from '../../../../../models/index';

@Component({
    selector: 'store-item',
    templateUrl: 'store-item.component.html',
    styleUrls: ['store-item.component.css']
})
export class StoreItemComponent {
    @Input()  public item: Computer;
    @Output() public remove = new EventEmitter<Computer>();

    public removeStoreItem() {
        if(confirm("Do you want to delete the item from store?")) {
            this.remove.emit(this.item);
        }
    }
}