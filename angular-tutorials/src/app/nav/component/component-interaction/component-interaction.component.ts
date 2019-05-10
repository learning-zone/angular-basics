import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-interaction',
  templateUrl: './component-interaction.component.html',
  styleUrls: ['./component-interaction.component.scss']
})
export class ComponentInteractionComponent implements OnInit {
  title: string;
  numbers: Array<number>;

  constructor() {
    this.title = 'Number Array';
    this.numbers = [10, 20, 30, 40, 50];
  }

  ngOnInit() {}

  call(value: number): void {
    console.log('You clicked: ' + value);
  }
}
