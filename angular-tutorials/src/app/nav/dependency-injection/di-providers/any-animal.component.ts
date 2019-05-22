import { Component } from '@angular/core';
import { AnimalService } from './service/animal.service';

@Component({
  selector: 'app-any-animal',
  providers: [AnimalService],
  template: `
    <app-animal-details></app-animal-details>
  `
})
export class AnyAnimalComponent {}
