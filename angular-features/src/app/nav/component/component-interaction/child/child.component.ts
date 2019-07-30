import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {
  @Input() child: { futbols: Array<boolean>; name: string; id: number };
  @Output() emitPass: EventEmitter<number> = new EventEmitter<number>();
  constructor() {}

  ngOnInit() {}

  passBall() {
    this.emitPass.emit(this.child.id);
  }
}
