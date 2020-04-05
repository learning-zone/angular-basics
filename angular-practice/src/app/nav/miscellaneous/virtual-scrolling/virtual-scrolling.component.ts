import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-virtual-scrolling',
  templateUrl: './virtual-scrolling.component.html',
  styleUrls: ['./virtual-scrolling.component.scss']
})
export class VirtualScrollingComponent {
  numbers: number[] = [];

  constructor() {
    for (let index = 0; index < 10000; index++) {
      this.numbers.push(index);
    }
  }
}
