import { Component, OnInit, InjectionToken, Inject } from '@angular/core';
import { Book } from '../di-providers/book';

const JAVA_BOOK = new Book('Learning Java', 'Java');
export const HELLO_MESSAGE = new InjectionToken<string>('Hello!');

@Component({
  selector: 'app-book',
  providers: [
    {provide: Book, useValue: JAVA_BOOK},
    {provide: HELLO_MESSAGE, useValue: 'Hello World!'}
  ],
  template: `
  <ul>
    <li>Book Name: <b>{{book.name}}</b></li>
    <li>Category:  <b>{{book.category}}</b></li>
    <li>Message:   <b>{{message}}</b></li>
  </ul>
  `
})
export class BookComponent implements OnInit {

  constructor(private book: Book, @Inject(HELLO_MESSAGE) private message: string) { }

  ngOnInit() {
  }

}
