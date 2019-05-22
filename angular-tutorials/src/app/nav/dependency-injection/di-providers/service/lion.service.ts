import { Injectable } from '@angular/core';
import { AnimalService } from './animal.service';

@Injectable({
  providedIn: 'root'
})
export class LionService extends AnimalService {
  name = 'Lion';
  food = 'Meat';

  constructor() {
    super();
  }
}
