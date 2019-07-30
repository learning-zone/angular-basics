import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-internationalization',
  templateUrl: './internationalization.component.html',
  styleUrls: ['./internationalization.component.scss']
})
export class InternationalizationComponent {

  minutes = 0;
  gender = 'female';
  fly = true;
  logo = 'https://angular.io/assets/images/logos/angular/angular.png';
  heroes: string[] = ['Magneta', 'Celeritas', 'Dynama'];
  inc(i: number) {
    this.minutes = Math.min(5, Math.max(0, this.minutes + i));
  }
  male() { this.gender = 'male'; }
  female() { this.gender = 'female'; }
  other() { this.gender = 'other'; }

}
