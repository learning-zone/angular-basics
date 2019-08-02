import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent {
  child1: { futbols: Array<boolean>; name: string; id: number } = {
    futbols: [true, true, true, true, true],
    name: 'Child Component 1',
    id: 1
  };

  child2: { futbols: Array<boolean>; name: string; id: number } = {
    futbols: [true, true, true, true],
    name: 'Child Component 2',
    id: 2
  };

  passBall(id: number) {
    if (id == 1) {
      this.child1.futbols.pop();
      this.child2.futbols.push(true);
    } else if (id == 2) {
      this.child2.futbols.pop();
      this.child1.futbols.push(true);
    }
  }
}
