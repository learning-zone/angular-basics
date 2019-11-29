import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-test-one',
  template: `
    <span>{{animal}}</span>
    <button (click)="makeNoise()">Make noise</button>
  `
})
export class TestOneComponent {

  @Input('animal') animal: string;
  @Input('noise') noise: string; 

  makeNoise() {
    alert(`${this.noise}`);
  }

}
