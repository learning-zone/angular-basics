import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom'
})
export class CustomPipe implements PipeTransform {

  transform(base: number, exponent: number): number {
    return Math.pow(base, exponent);
  }
}
