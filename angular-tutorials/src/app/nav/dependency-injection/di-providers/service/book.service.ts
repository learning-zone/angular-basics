import { Injectable } from '@angular/core';
import { Book } from '../book';

const BOOKS: Book[] = [
  { name: 'Head First Java', category: 'Java' },
  { name: 'Hibernate in Action', category: 'Hibernate' },
  { name: 'Thinking in Java', category: 'Java' },
  { name: 'Beginning Hibernate', category: 'Hibernate' },
  { name: 'Effective Java', category: 'Java' },
  { name: 'Learning Java', category: 'Java' },
  { name: 'Hibernate Recipes', category: 'Hibernate' }
];

@Injectable({
  providedIn: 'root'
})
export class BookService {
  getAllBooks(): Book[] {
    return BOOKS;
  }
}
