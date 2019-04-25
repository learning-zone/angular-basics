import { Component, OnInit } from '@angular/core';
import {Item} from '../item';
import {ItemService} from '../item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  // the array of Item type objects
  items: Item[];
  // selected item by clicking on it
  // selectedItem: Item;
  constructor(private itemService: ItemService) {}
  ngOnInit() {
    // on initialization get the mock items list
    this.getItems();
  }
  // function to retrieve the items from the service
  getItems(): void {
    // this is the same as asynchronous: this.items = this.itemService.getItems();
    this.itemService.getItems()
      .subscribe(items => this.items = items);
  }
  // method to register a selected item
  // onSelect(item: Item): void {
  //   this.selectedItem = item;
  // }
}
