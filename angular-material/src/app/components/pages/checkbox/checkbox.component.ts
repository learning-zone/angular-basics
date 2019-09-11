import { Component } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;
}
