import { Component } from '@angular/core';

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.scss']
})
export class TemplateDrivenComponent {
  model: any = {};

  onSubmit() {
    alert('SUCCESS!!! \n\n' + JSON.stringify(this.model));
  }
}
