import { Injectable } from '@angular/core';
import { Computer } from '../../di-providers/computer';


@Injectable({
  providedIn: 'root'
})
export class LaptopService implements Computer {

  getComputerName() {
    return 'LAPTOP';
  }
}
