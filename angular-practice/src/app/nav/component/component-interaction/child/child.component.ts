import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent {
  @Input() child: { futbols: Array<boolean>; name: string; id: number };
  @Output() emitPass: EventEmitter<number> = new EventEmitter<number>();

  passBall() {
    this.emitPass.emit(this.child.id);
  }
}
