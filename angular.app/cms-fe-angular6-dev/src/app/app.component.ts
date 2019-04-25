import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.Emulated,
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor () {
  }

  public ngOnInit () {
  }
}
