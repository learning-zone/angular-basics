import { Injectable } from '@angular/core';
import { AnimalService } from './animal.service';

@Injectable({
  providedIn: 'root'
})
export class CowService extends AnimalService {
  name = 'Cow';
  food = 'Grass';
  constructor() {
    super();
   }
}
