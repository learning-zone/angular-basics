import { Injectable } from '@angular/core';
import { BookService } from '../service/book.service';

@Injectable({
  providedIn: 'root',
  useFactory: (bookService: BookService) =>
    new PreferredBookService(bookService),
  deps: [BookService]
})
export class PreferredBookService {
  constructor(private bookService: BookService) {}

  getPreferredBooks() {
    return this.bookService
      .getAllBooks()
      .filter(book => book.category === 'Java')
      .map(book => book.name)
      .slice(0, Math.max(0, 3))
      .join(' | ');
  }
}
