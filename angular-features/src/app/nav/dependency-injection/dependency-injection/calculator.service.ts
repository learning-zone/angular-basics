import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  
  sum(val1, val2): number {
    return parseInt(val1) + parseInt(val2);
  }
}
