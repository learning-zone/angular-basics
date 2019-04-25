import {Component} from '@angular/core';

// Import NgClass directive
import {NgClass} from '@angular/common';

import {Accordion} from './accordion.component';

@Component({
  selector: 'accordion-group, [accordion-group]',
  inputs: ['heading', 'isOpen'],
  directives: [NgClass],
  template: require('./accordion-group.html')
})
export class AccordionGroup {
  private _isOpen: boolean = false;

  constructor(private accordion: Accordion) {
    this.accordion.addGroup(this);
  }

  toggleOpen(event) {
    event.preventDefault();
    this.isOpen = !this.isOpen;
  }

  onDestroy(): void {
    this.accordion.removeGroup(this);
  }

  public get isOpen(): boolean {
    return this._isOpen;
  }

  public set isOpen(value: boolean){
    this._isOpen = value;
    if (value) {
      this.accordion.closeOthers(this);
    }
  }
}
