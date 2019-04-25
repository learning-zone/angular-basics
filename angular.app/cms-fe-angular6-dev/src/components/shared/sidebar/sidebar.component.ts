import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  // styleUrls  : ['./sidebar.component.less'],
})
export class SidebarComponent implements OnInit {

  public isOpen = {
    one: true,
    two: false,
    three: false,
    four: false,
    five: false,
  };

  private store: object;

  constructor () {
    // this.store = localStorage;
  }

  public openChange (value: string) {
    Object.keys(this.isOpen).forEach((v, i) => {
      if (value == v) {
        this.isOpen[v] = true;
      } else {
        this.isOpen[v] = false;
      }
    });
  }

  public ngOnInit () {
  }
}
