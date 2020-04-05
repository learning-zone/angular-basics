import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trackby',
  templateUrl: './trackby.component.html',
  styleUrls: ['./trackby.component.scss']
})
export class TrackbyComponent {

  collection: { id: number; }[];
  noOfClick = 0;
  constructor() {
    this.collection = [{id: 1}, {id: 2}, {id: 3}];
  }

  getItems() {
    this.noOfClick++;
    this.collection = this.getItemsFromServer();
  }

  getItemsFromServer() {
    return [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}];
  }

  trackByFn(index: any, item: any) {
    return index;
  }
}
