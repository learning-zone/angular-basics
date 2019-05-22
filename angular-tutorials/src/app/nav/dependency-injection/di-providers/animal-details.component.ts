import { Component, OnInit } from '@angular/core';
import { AnimalService } from './service/animal.service';

@Component({
  selector: 'app-animal-details',
  template: `
    <b> {{ name }} eats {{ food }} </b>
  `
})
export class AnimalDetailsComponent implements OnInit {
  name: string;
  food: string;
  constructor(private animalService: AnimalService) {}

  ngOnInit() {
    this.name = this.animalService.getName();
    this.food = this.animalService.getFood();
  }
}
