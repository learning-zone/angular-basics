import { Component,Input,Output } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterItems',
    pure: false
})
export class filterItemsPipe implements PipeTransform {
    transform(items: any,like:string) {
        return items.filter(item => item.startsWith(like));
    }
}

@Component({
    moduleId: module.id,
    selector: 'md-dropdown',
    template: require('./md-dropdown.html'),
    styles: [require('./md-dropdown.css')],
    pipes: [filterItemsPipe]
  })

export class MdDropdown{
    title = '';
    @Input() items: Array<any> = ['C','D'];
    
    private showPopup: boolean = true;
    //private items = ['Apple', 'Orange', 'Banana', 'Apple', 'Orange', 'Banana', 'Apple', 'Orange', 'Banana', 'Apple', 'Orange', 'Banana'];
    private itemText = '';
    private currentItem: any = 'A';

    toggle(){
        this.showPopup = !this.showPopup;
    }
    select(item: any) {
        alert('select');
        this.itemText = item;
        this.currentItem = item;
        this.showPopup = false;
    }
    change($event) {        
        this.showPopup = true;
    }
}