import { Component } from '@angular/core';

@Component({
  selector: 'app-component-interaction',
  templateUrl: './component-interaction.component.html',
  styleUrls: ['./component-interaction.component.scss']
})
export class ComponentInteractionComponent {
  title: string;
  output: string;
  numbers: Array<number>;

  constructor() {
    this.title = 'Number Array';
    this.numbers = [10, 20, 30, 40, 50];
  }

  call(value: string): void {
    this.output = '[ You Clicked: ' + value + ' ]';
  }
}
