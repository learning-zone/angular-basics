import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.scss'],
  animations: [
    trigger('buttonState', [
      state(
        'inactive',
        style({
          backgroundColor: 'yellow',
          transform: 'scale(1)'
        })
      ),
      state(
        'active',
        style({
          backgroundColor: 'green',
          transform: 'scale(1.1)'
        })
      ),
      transition('inactive => active', animate('500ms ease-in')),
      transition('active => inactive', animate('500ms ease-out'))
    ])
  ]
})
export class AnimationsComponent {
  state: String = 'inactive';
  isOpen = true;

  toggleState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
    this.isOpen = this.state === 'active' ? false : true;
  }
}
