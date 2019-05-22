import { Component, OnInit } from '@angular/core';
import { AnimalService } from './service/animal.service';
import { CowService } from './service/cow.service';

@Component({
  selector: 'app-cow',
  providers: [{ provide: AnimalService, useClass: CowService }],
  template: `
    <app-animal-details></app-animal-details>
  `
})
export class CowComponent {}
