import { Pipe, PipeTransform, ChangeDetectorRef, NgZone } from '@angular/core';

/*
 * Animating text as if it was being typed by a user
*/

@Pipe({name: 'naturalType', pure: false})
export class NaturalType implements PipeTransform {
  private typed: string = '';
  private target: string = '';
  private currentIndex: number = -1;
  private timeoutHandle: number = -1;

  constructor( private changeDetector: ChangeDetectorRef, private ngZone: NgZone ) { }

  transform(value: string, mintypingSpeed: number = 30): any {
      if (this.target !== value) {
       clearTimeout(this.timeoutHandle);
       this.typed = '';
       this.currentIndex = -1;
       this.target = value;
       this.typeNextCharacter(mintypingSpeed);
      }
      return this.typed;
  }
   
  private typeNextCharacter(mintypingSpeed: number) {
    this.currentIndex++;
    this.typed = this.target.substr(0, this.currentIndex);
    this.changeDetector.markForCheck();
    if (this.typed !== this.target) {
      const time = Math.round(Math.random() * 70) + mintypingSpeed;
      this.ngZone.runOutsideAngular(() => {
        this.timeoutHandle = <any> setTimeout(()=> {
          this.ngZone.run(() => this.typeNextCharacter(mintypingSpeed));
        },time);
      });  
    }
  }
}