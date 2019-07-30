import { Component } from '@angular/core';
import { CalculatorService } from './calculator.service';

@Component({
  selector: 'app-dependency-injection',
  templateUrl: './dependency-injection.component.html',
  styleUrls: ['./dependency-injection.component.scss']
})
export class DependencyInjectionComponent  {
  result: number;
  constructor(private calculator: CalculatorService) {  }

  add(val1: number, val2: number) {
    this.result = this.calculator.sum(val1, val2);
  }
}
