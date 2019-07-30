import { Component, OnInit } from '@angular/core';
import { Hero, heroes } from './hero';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.scss']
})
export class DirectivesComponent implements OnInit {
  color: string;
  heroes = heroes;
  hero = this.heroes[0];
  condition = false;
  logs: string[] = [];
  showSad = true;
  status = 'ready';

  constructor() {}

  ngOnInit() {}

  trackById(index: number, hero: Hero): number {
    return hero.id;
  }
}
