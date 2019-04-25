// ```
// rating.component.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// rating.component.js may be freely distributed under the MIT license
// ```

// # Rating Component

import {Component,
  Input,
  Output,
  EventEmitter} from '@angular/core';

@Component({
  selector: 'rating',
  template: require('./rating.html'),
  directives: []
})

export class Rating {

  @Input() rate: number;

  @Input() interactive: boolean;

  @Output() updateRate = new EventEmitter();

  private range: Array<number> = [1, 2, 3, 4, 5];

  update(value) {

    // Check to see if this component should be interactive or not
    if (this.interactive) {

      this.rate = value;
      // push a new value every time we click on a star
      // this is thanks to the fact that the `NG2` `EventEmitter`
      // is using `Rx` thus this is an `Observable`
      this.updateRate.next(value);
    } else {
      // DEBUG
      console.log('This rating component is not interactive.');
    }
  }
}
