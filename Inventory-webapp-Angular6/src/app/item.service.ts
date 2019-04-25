import { Injectable } from '@angular/core';
import { Item } from './item';
import { ITEMS } from './mock-items';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private messageService: MessageService) {}
  getItem(id: number): Observable<Item> {
    this.messageService.add(`MessageService: fetched Item id: ${id}`);
    return of(ITEMS.find(item => item.id === id));
  }
  getItems(): Observable<Item[]> {
    this.messageService.add('MessageService: fetched Items');
    return of(ITEMS);
  }
}
