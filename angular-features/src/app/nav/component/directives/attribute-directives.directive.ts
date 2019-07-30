import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAttributeDirectives]'
})
export class AttributeDirectivesDirective {
  
  constructor(private el: ElementRef) {  }

  @Input('appAttributeDirectives') highlightColor: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
