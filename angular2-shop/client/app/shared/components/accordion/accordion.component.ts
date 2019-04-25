import {Component} from '@angular/core';

import {AccordionGroup} from './accordion-group.component';

@Component({
  selector: 'accordion, [accordion]',
  host: {
    'class': 'panel-group'
  },
  template: '<ng-content></ng-content>'
})
export class Accordion {
  private groups: Array<AccordionGroup> = [];

  addGroup(group: AccordionGroup): void {
    this.groups.push(group);
  }

  closeOthers(openGroup: AccordionGroup): void {
    this.groups.forEach((group: AccordionGroup) => {
      if (group !== openGroup) {
        group.isOpen = false;
      }
    });
  }

  removeGroup(group: AccordionGroup): void {
    const index = this.groups.indexOf(group);
    if (index !== -1) {
      this.groups.splice(index, 1);
    }
  }
}
