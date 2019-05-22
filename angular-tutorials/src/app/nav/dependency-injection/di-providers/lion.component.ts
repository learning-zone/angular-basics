import { Component } from '@angular/core';
import { AnimalService } from './service/animal.service';
import { LionService } from './service/lion.service';

@Component({
  selector: 'app-lion',
  providers: [{ provide: AnimalService, useClass: LionService }],
  template: `
    <app-animal-details></app-animal-details>
  `
})
export class LionComponent {}
