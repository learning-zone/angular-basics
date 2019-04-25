import { Directive, ViewContainerRef, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[doubleballResult]',
})
export class DoubleBallDirective {
  @Input('doubleballResult') public data: string;

  constructor (
    private renderer: Renderer2,
    private ref: ElementRef,
    // private viewContainerRef: ViewContainerRef,
  ) { }

  public ngOnInit () {
    // this.renderer.appendChild(this.ref.nativeElement, _html.body.querySelector('div'));
    this.ref.nativeElement.insertAdjacentHTML('afterbegin', '<div class="double-ball">' + this.data.split(',').map((v, i) => {
      return `<span class="${i < 6 ? 'red' : 'blue'}">${v}</span>`;
    }).join('') + '</div>');
  }
}
