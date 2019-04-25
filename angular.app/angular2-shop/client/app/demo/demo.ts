import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';

// webpack html imports
let template = require('./demo.html');

@Component({
  selector: 'demo',
  template: template,
  directives: []
})

export class Demo{

}
